import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiResponseDto } from '../dto/api-response.dto';

@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, ApiResponseDto<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponseDto<T>> {
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse();
        const request = httpContext.getRequest();

        return next.handle().pipe(
            map(data => {
                const statusCode = response.statusCode || HttpStatus.OK;

                if (request.method === 'DELETE' && statusCode === HttpStatus.NO_CONTENT) {
                    response.status(HttpStatus.OK);
                    return new ApiResponseDto<T>(HttpStatus.OK, 'Successfully deleted');
                }

                // Check if data is already in our ApiResponseDto format (e.g. from a service)
                if (data && typeof data === 'object' && 'statusCode' in data && 'message' in data) {
                    return data as ApiResponseDto<T>;
                }

                // If data is a simple message string (e.g. from logout)
                if (typeof data === 'object' && data !== null && 'message' in data && Object.keys(data).length === 1) {
                    return new ApiResponseDto<T>(statusCode, data.message, undefined);
                }

                return new ApiResponseDto<T>(statusCode, 'Success', data);
            }),
            catchError(err => {
                const statusCode =
                    err instanceof HttpException
                        ? err.getStatus()
                        : HttpStatus.INTERNAL_SERVER_ERROR;

                let message = 'Internal server error';
                let errorDetail = err.message; // Default to err.message

                if (err instanceof HttpException) {
                    const errResponse = err.getResponse();
                    message = (typeof errResponse === 'object' && errResponse !== null && 'message' in errResponse)
                        ? (errResponse as any).message
                        : err.message;
                    if (typeof errResponse === 'object' && errResponse !== null && 'error' in errResponse) {
                        errorDetail = (errResponse as any).error;
                    }
                    // For class-validator, message might be an array
                    if (Array.isArray(message)) {
                        errorDetail = message.join(', ');
                        message = 'Validation failed'; // Generic message for validation errors
                    }
                }
                // Ensure the response is an instance of ApiResponseDto for errors too.
                // This requires modifying how NestJS handles exceptions, ideally with a custom ExceptionFilter.
                // For now, the interceptor primarily formats successful responses.
                // To truly enforce this for errors, an ExceptionFilter is needed.
                // This interceptor will shape the error re-thrown if it's an HttpException.
                // For other errors, it will be a generic internal server error.

                // We will create an ApiResponseDto and throw it as part of an HttpException
                // This is a common pattern to ensure the response body is consistent.
                const apiResponseError = new ApiResponseDto<null>(statusCode, message, null, errorDetail || message);
                throw new HttpException(apiResponseError, statusCode);
            }),
        );
    }
}

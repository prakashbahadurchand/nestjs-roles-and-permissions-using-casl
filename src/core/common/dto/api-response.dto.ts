import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T> {
    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty({ required: false })
    data?: T;

    @ApiProperty({ required: false })
    error?: string;

    constructor(statusCode: number, message: string, data?: T, error?: string) {
        this.statusCode = statusCode;
        this.message = message;
        if (data) this.data = data;
        if (error) this.error = error;
    }
}

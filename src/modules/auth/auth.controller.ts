import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { User } from '../users/entities/user.entity'; // Assuming User entity is defined
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ApiResponseDto } from '../../core/common/dto/api-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered.', type: ApiResponseDto<User> })
    @ApiResponse({ status: 400, description: 'Bad Request.', type: ApiResponseDto<null> })
    @ApiResponse({ status: 409, description: 'Conflict. Email already exists.', type: ApiResponseDto<null> })
    async register(@Body() registerAuthDto: RegisterAuthDto): Promise<Omit<User, 'password'>> {
        return this.authService.register(registerAuthDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Log in an existing user' })
    @ApiResponse({ status: 200, description: 'User successfully logged in.', type: ApiResponseDto<LoginResponseDto> })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid credentials.', type: ApiResponseDto<null> })
    async login(@Body() loginAuthDto: LoginAuthDto): Promise<LoginResponseDto> {
        return this.authService.login(loginAuthDto);
    }

    @Post('logout')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Log out the current user' })
    @ApiResponse({ status: 200, description: 'User successfully logged out.', type: ApiResponseDto<{ message: string }> })
    @ApiResponse({ status: 401, description: 'Unauthorized.', type: ApiResponseDto<null> })
    async logout(@Req() req: Request): Promise<{ message: string }> {
        const token = req.headers.authorization?.split(' ')?.[1];
        return this.authService.logout(token || '');
    }
}

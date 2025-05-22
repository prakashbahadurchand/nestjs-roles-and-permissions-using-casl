import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { Request } from 'express';
import { ApiResponseDto } from '../../core/common/dto/api-response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all users (requires authentication)' })
    @ApiResponse({ status: 200, description: 'List of users.', type: ApiResponseDto<User[]> })
    @ApiResponse({ status: 401, description: 'Unauthorized.', type: ApiResponseDto<null> })
    async findAll(@Req() req: Request): Promise<Omit<User, 'password'>[]> {
        console.log('Authenticated user:', req.user); // req.user will be populated by JwtStrategy
        return this.usersService.findAll();
    }

    // Example of a protected route that returns the current user
    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user profile (requires authentication)' })
    @ApiResponse({ status: 200, description: 'Current user data.', type: ApiResponseDto<User> })
    @ApiResponse({ status: 401, description: 'Unauthorized.', type: ApiResponseDto<null> })
    getProfile(@Req() req: Request) {
        return req.user; // req.user is populated by Passport after successful JWT validation
    }
}

import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && user.password && await bcrypt.compare(pass, user.password)) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(loginAuthDto: LoginAuthDto): Promise<{ accessToken: string }> {
        const user = await this.validateUser(loginAuthDto.email, loginAuthDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, sub: user.id, username: user.username };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async register(registerAuthDto: RegisterAuthDto): Promise<Omit<User, 'password'>> {
        const existingUser = await this.usersService.findOneByEmail(registerAuthDto.email);
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }
        return this.usersService.create(registerAuthDto);
    }

    // Basic logout - in a real app, you might use token blacklisting
    async logout(token: string): Promise<{ message: string }> {
        // For JWT, logout is typically handled client-side by deleting the token.
        // Server-side might involve adding token to a blacklist if using refresh tokens or more complex session management.
        // This is a placeholder as direct JWT logout server-side without blacklisting isn't standard.
        console.log(`Logout attempt with token: ${token}`);
        return { message: 'Logged out successfully' };
    }
}

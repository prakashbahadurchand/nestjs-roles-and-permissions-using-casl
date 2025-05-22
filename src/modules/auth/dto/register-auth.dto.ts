import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterAuthDto {
    @ApiProperty({ example: 'prakashbahadurchand', description: 'The username of the user' })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ example: 'prakashbahadurchand@gmail.com', description: 'The email of the user' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '12345678', description: 'The password of the user' })
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

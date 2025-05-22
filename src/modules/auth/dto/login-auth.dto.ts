import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
    @ApiProperty({ example: 'prakashbahadurchand@gmail.com', description: 'The email of the user' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '12345678', description: 'The password of the user' })
    @IsNotEmpty()
    password: string;
}

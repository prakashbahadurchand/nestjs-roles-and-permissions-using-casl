import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from './entities/user.entity'; // Import Role enum
import { RegisterAuthDto } from '../auth/dto/register-auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOneByEmail(email: string): Promise<User | undefined> {
        // Explicitly select the password field for authentication purposes
        return this.usersRepository.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();
    }

    async findOneById(id: number): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async create(registerAuthDto: RegisterAuthDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(registerAuthDto.password, 10);
        const newUser = this.usersRepository.create({
            ...registerAuthDto,
            password: hashedPassword,
            roles: [Role.READER], // Explicitly set default role here
        });
        await this.usersRepository.save(newUser);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = newUser;
        return result as User;
    }

    async findAll(): Promise<Omit<User, 'password'>[]> {
        const users = await this.usersRepository.find();
        return users.map(user => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, ...result } = user;
            return result;
        });
    }
}

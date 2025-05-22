import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Article } from '../../articles/entities/article.entity';

export enum Role {
    ADMIN = 'admin',
    AUTHOR = 'author',
    READER = 'reader',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false }) // Prevent password from being selected by default
    password?: string;

    @Column({
        type: 'simple-array',
    })
    roles: Role[];

    @OneToMany(() => Article, article => article.author)
    articles: Article[];
}

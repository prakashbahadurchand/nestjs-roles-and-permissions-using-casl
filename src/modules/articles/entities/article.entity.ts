import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column('text')
    content: string;

    @Column({ default: false })
    isPublished: boolean;

    @ManyToOne(() => User, user => user.articles, { eager: true })
    author: User;

    @Column()
    authorId: number;
}

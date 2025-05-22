import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './modules/users/entities/user.entity';
import { Article } from './modules/articles/entities/article.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // Load .env file if you have one

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'toor', // Consistent with app.module.ts default
    database: process.env.DB_DATABASE || 'nestjs_casl_demo', // Consistent with app.module.ts
    entities: [User, Article],
    migrations: [__dirname + '/core/database/migrations/*{.ts,.js}'], // Path to your migrations
    synchronize: false, // IMPORTANT: Should be false when using migrations
    logging: process.env.NODE_ENV === 'development',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

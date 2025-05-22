import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../../../../src/data-source'; // Adjust path as necessary
import { User } from '../../../../src/modules/users/entities/user.entity'; // Adjust path
import { Article } from '../../../../src/modules/articles/entities/article.entity'; // Adjust path
import * as bcrypt from 'bcrypt';
import { Role } from '../../../../src/modules/users/entities/user.entity'; // Adjust path

async function runSeed() {
    const dataSource = new DataSource({
        ...dataSourceOptions,
        logging: ['error', 'warn'], // Reduce verbosity for seeds
    });
    await dataSource.initialize();

    console.log('Seeding database...');

    const userRepository = dataSource.getRepository(User);
    const articleRepository = dataSource.getRepository(Article);

    // Clean up existing data
    await articleRepository.query('SET FOREIGN_KEY_CHECKS = 0;');
    await articleRepository.clear();
    await userRepository.clear();
    await articleRepository.query('SET FOREIGN_KEY_CHECKS = 1;');


    // Seed Users
    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const adminUser = userRepository.create({
        username: 'admin',
        email: 'admin@example.com',
        password: adminPassword,
        roles: [Role.ADMIN],
    });
    await userRepository.save(adminUser);
    console.log('Admin user seeded.');

    const authorPassword = await bcrypt.hash('Author@123', 10);
    const authorUser = userRepository.create({
        username: 'author1',
        email: 'author1@example.com',
        password: authorPassword,
        roles: [Role.AUTHOR],
    });
    await userRepository.save(authorUser);
    console.log('Author user seeded.');

    const readerPassword = await bcrypt.hash('Reader@123', 10);
    const readerUser = userRepository.create({
        username: 'reader1',
        email: 'reader1@example.com',
        password: readerPassword,
        roles: [Role.READER],
    });
    await userRepository.save(readerUser);
    console.log('Reader user seeded.');

    // Seed Articles
    const article1 = articleRepository.create({
        title: 'Admin\'s First Article',
        content: 'This is the content of the first article by Admin.',
        author: adminUser,
        isPublished: true,
    });
    await articleRepository.save(article1);

    const article2 = articleRepository.create({
        title: 'Author\'s Draft Article',
        content: 'This is a draft article by Author1.',
        author: authorUser,
        isPublished: false,
    });
    await articleRepository.save(article2);

    const article3 = articleRepository.create({
        title: 'Author\'s Published Work',
        content: 'An interesting piece by Author1, now published.',
        author: authorUser,
        isPublished: true,
    });
    await articleRepository.save(article3);

    console.log('Articles seeded.');

    await dataSource.destroy();
    console.log('Seeding complete. Datasource destroyed.');
}

runSeed().catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
});

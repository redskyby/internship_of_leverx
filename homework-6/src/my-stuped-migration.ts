import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';
import { Like } from './likes/entities/like.entity';

const sequelize = new Sequelize({
  database: 'homework',
  username: 'root',
  password: 'Docenko4493!',
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.addModels([User, Post, Like]);

// Опишите вашу миграцию
async function runMigration() {
  // Синхронизация моделей с базой данных
  // await sequelize.sync();

  // Создание 10 записей в таблице users
  await Promise.all(
    [
      {
        name: 'user1',
        lastName: '1',
        email: 'user1@example.com',
        password: await bcrypt.hash('123456', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user2',
        lastName: '1',
        email: 'user2@example.com',
        password: await bcrypt.hash('123456', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user3',
        lastName: '1',
        email: 'user3@example.com',
        password: await bcrypt.hash('123456', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user4',
        lastName: '1',
        email: 'user4@example.com',
        password: await bcrypt.hash('123456', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user5',
        lastName: '1',
        email: 'user5@example.com',
        password: await bcrypt.hash('123456', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user6',
        lastName: '1',
        email: 'user6@example.com',
        password: await bcrypt.hash('123456', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user7',
        lastName: '1',
        email: 'user7@example.com',
        password: await bcrypt.hash('123456', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user8',
        lastName: '1',
        email: 'user8@example.com',
        password: await bcrypt.hash('123456', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user9',
        lastName: '1',
        email: 'user9@example.com',
        password: await bcrypt.hash('123456', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user10',
        lastName: '1',
        email: 'user10@example.com',
        password: await bcrypt.hash('123456', 3),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ].map((userData) => User.create(userData)),
  );

  await Promise.all(
    [
      {
        title: 'Post 1',
        description: 'Description 1',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Post 2',
        description: 'Description 2',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Post 3',
        description: 'Description 3',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Post 4',
        description: 'Description 4',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Post 5',
        description: 'Description 5',
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Post 6',
        description: 'Description 5',
        userId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Post 7',
        description: 'Description 5',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Post 8',
        description: 'Description 5',
        userId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Post 9',
        description: 'Description 5',
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Post 10',
        description: 'Description 5',
        userId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ].map((postData) => Post.create(postData)),
  );
  await Promise.all(
    [
      { userId: 1, postId: 1 },
      { userId: 2, postId: 1 },
      { userId: 3, postId: 1 },
      { userId: 1, postId: 1 },
      { userId: 2, postId: 1 },
      { userId: 6, postId: 2 },
      { userId: 7, postId: 2 },
      { userId: 8, postId: 2 },
      { userId: 9, postId: 2 },
      { userId: 10, postId: 2 },
    ].map((likeData) => Like.create(likeData)),
  );

  console.log('Migration completed successfully!');
}

runMigration().catch((error) => {
  console.error('Error during migration:', error);
});

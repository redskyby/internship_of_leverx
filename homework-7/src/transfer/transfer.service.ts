import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel as InjectSequelizeModel } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { Like } from '../likes/entities/like.entity';
import { InjectModel as InjectMongooseModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { User as UserMongo } from '../schemas/user.schema';
import { Like as LikeMongo } from '../schemas/like.schema';
import { Post as PostMongo } from '../schemas/post.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TransferService {
  constructor(
    private readonly sequelize: Sequelize,
    @InjectSequelizeModel(User) private userRepository: typeof User,
    @InjectSequelizeModel(Post) private postRepository: typeof Post,
    @InjectSequelizeModel(Like) private likeRepository: typeof Like,
    @InjectMongooseModel(UserMongo.name) private userModel: Model<UserMongo>,
    @InjectMongooseModel(PostMongo.name) private postModel: Model<PostMongo>,
    @InjectMongooseModel(LikeMongo.name) private likeModel: Model<LikeMongo>,
  ) {}

  async transferDataToMongoDb() {
    // @ts-ignore
    const mysqlUsers = await this.sequelize.models.User.findAll<User>();
    // @ts-ignore
    const mysqlPosts = await this.sequelize.models.Post.findAll<Post>();

    for (const user of mysqlUsers) {
      // Создаем пользователя в MongoDB и сохраняем результат, чтобы получить его _id
      const createdUser = await this.userModel.create({
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        posts: [],
      });

      // Ищем все посты этого пользователя в MySQL
      const userPosts = mysqlPosts.filter((post) => post.userId === user.id);

      // Добавляем идентификаторы постов к пользователю в MongoDB
      for (const post of userPosts) {
        const newPost = await this.postModel.create({
          id: post.id,
          title: post.title,
          description: post.description,
          userId: createdUser._id, // Ссылка на нового пользователя
        });

        // Обновляем массив `posts` у созданного пользователя
        await this.userModel.updateOne(
          { _id: createdUser._id },
          { $push: { posts: newPost._id } }, // Добавляем идентификатор поста в массив `posts`
        );
      }
    }

    // Переносим лайки
    // @ts-ignore
    const mysqlLikes = await this.sequelize.models.Like.findAll<Like>();
    for (const like of mysqlLikes) {
      await this.likeModel.create({
        id: like.id,
        userId: new Types.ObjectId(like.userId),
        postId: new Types.ObjectId(like.postId),
      });
    }
  }
}

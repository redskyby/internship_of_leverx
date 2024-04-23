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
import { Model } from 'mongoose';
import {ModelCtor} from "sequelize";

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

    const UserModel: ModelCtor<User> = this.sequelize.models.User as ModelCtor<User>;
    const mysqlUsers: User[] = await UserModel.findAll();


    const PostModel: ModelCtor<Post> = this.sequelize.models.Post as ModelCtor<Post>;
    const mysqlPosts : Post[] =   await PostModel.findAll();

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

    const LikeModel: ModelCtor<Like> = this.sequelize.models.Like as ModelCtor<Like>;
    const mysqlLikes : Like[] =   await LikeModel.findAll();

    for (const like of mysqlLikes) {
      await this.likeModel.create({
        id: like.id,
        userId: like.userId,
        postId: like.postId,
      });
    }
  }
}

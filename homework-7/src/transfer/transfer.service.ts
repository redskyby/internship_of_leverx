import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { Sequelize } from 'sequelize-typescript';
// import { InjectModel as InjectSequelizeModel } from '@nestjs/sequelize/dist/common/sequelize.decorators';
import { InjectModel as InjectSequelizeModel } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { Like } from '../likes/entities/like.entity';
// import { InjectModel as InjectMongooseModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
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

  async findAll() {
    // const mysqlUsers = await this.sequelize.models.User.findAll();
    //
    // for (const user of mysqlUsers) {
    //   await this.userModel.create({
    //     // @ts-ignore
    //     id: user.id,
    //     // @ts-ignore
    //     name: user.name,
    //     // @ts-ignore
    //     lastName: user.lastName,
    //     // @ts-ignore
    //     password: user.password,
    //     // @ts-ignore
    //     email: user.email,
    //     posts: []
    //   });
    // }

    // const mysqlPosts = await this.sequelize.models.Post.findAll();
    // for (const post of mysqlPosts) {
    //   await this.postModel.create({
    //     // @ts-ignore
    //     id: post.id,
    //     // @ts-ignore
    //     title: post.title,
    //     // @ts-ignore
    //     description: post.description,
    //     // @ts-ignore
    //     userId: new Types.ObjectId(post.userId),
    //   });
    // }

    // // Переносим лайки
    // const mysqlLikes = await this.sequelize.models.Like.findAll();
    // for (const like of mysqlLikes) {
    //   await this.likeModel.create({
    //     // @ts-ignore
    //     id: like.id,
    //     // @ts-ignore
    //     userId: new Types.ObjectId(like.userId),
    //     // @ts-ignore
    //     postId: new Types.ObjectId(like.postId),
    //   });
    // }

    const mysqlUsers = await this.sequelize.models.User.findAll();
    const mysqlPosts = await this.sequelize.models.Post.findAll();

    for (const user of mysqlUsers) {
      // Создаем пользователя в MongoDB и сохраняем результат, чтобы получить его _id
      const createdUser = await this.userModel.create({
        // @ts-ignore
        id: user.id,
        // @ts-ignore
        name: user.name,
        // @ts-ignore
        lastName: user.lastName,
        // @ts-ignore
        password: user.password,
        // @ts-ignore
        email: user.email,
        posts: [], // Пустой массив для хранения постов
      });

      // Ищем все посты этого пользователя в MySQL
      // @ts-ignore
      const userPosts = mysqlPosts.filter((post) => post.userId === user.id);

      // Добавляем идентификаторы постов к пользователю в MongoDB
      for (const post of userPosts) {
        const newPost = await this.postModel.create({
          // @ts-ignore
          id: post.id,
          // @ts-ignore
          title: post.title,
          // @ts-ignore
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
    const mysqlLikes = await this.sequelize.models.Like.findAll();
    for (const like of mysqlLikes) {
      await this.likeModel.create({
        // @ts-ignore
        id: like.id,
        // @ts-ignore
        userId: new Types.ObjectId(like.userId),
        // @ts-ignore
        postId: new Types.ObjectId(like.postId),
      });
    }
  }

  create(createTransferDto: CreateTransferDto) {
    return 'This action adds a new transfer';
  }

  findOne(id: number) {
    return `This action returns a #${id} transfer`;
  }

  update(id: number, updateTransferDto: UpdateTransferDto) {
    return `This action updates a #${id} transfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} transfer`;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';
import { DuplicateException } from '../exceptions/duplicate.exception';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { InjectModel as InjectMongooseModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { User as UserMongo } from '../schemas/user.schema';
import { Model, Types } from 'mongoose';
import { Post as PostMongo } from '../schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    @InjectMongooseModel(UserMongo.name) private userModel: Model<UserMongo>,
    @InjectMongooseModel(PostMongo.name) private postModel: Model<PostMongo>,
  ) {}
  public async createPost(dto: CreatePostDto) {
    const { title, userId } = dto;

    const post = await this.postModel.findOne({ title: title });

    if (post) {
      throw new DuplicateException('Пост с таким заголовком уже существует.');
    }

    const { dataValues } = await this.postRepository.create(dto);

    const currentDto = { ...dataValues, userId: new Types.ObjectId(userId) };

    const newPost = await this.postModel.create(currentDto);

    await this.userModel.updateOne(
      { id: userId },
      { $push: { posts: newPost._id } },
    );

    return newPost;
  }

  public async findByAuthor(
    user: AllInformationUserDto,
    offset: number,
    limit: number,
  ) {
    const { id } = user;

    const userFromDb = await this.userModel.findOne({ id: id });

    if (!userFromDb) {
      throw new NotFoundException('Постов с таким автором не существует.');
    }

    const posts = await this.postModel
      .find({ userId: userFromDb._id })
      .skip(offset)
      .limit(limit);

    if (posts.length === 0) {
      throw new NotFoundException(
        'Задайте другие настройки поиска или список пуст.',
      );
    }

    return posts;
  }

  public async updatePost(dto: UpdatePostDto) {
    const { title, description } = dto;
    const post = await this.postModel.findOne({ title: title });

    if (!post) {
      throw new NotFoundException('Постов с таким названием не существует.');
    }

    const { id } = post;

    await this.postModel.updateOne(
      { id: id },
      {
        $set: {
          title: title,
          description: description,
        },
      },
      { new: true },
    );

    await this.postRepository.update(
      {
        title,
        description,
      },
      {
        where: { id },
      },
    );

    return { message: 'Пост успешно обновлен.' };
  }

  public async removePost(id: number) {
    const post = await this.postModel.findOne({ id: id });

    if (!post) {
      throw new NotFoundException('Постов с таким id не существует.');
    }

    await this.postModel.deleteOne({ id: id });

    await this.postRepository.destroy({ where: { id } });

    const allPost = await this.postModel.find();

    return allPost;
  }

  public async getAll(offset: number, limit: number) {
    // const allPost = await this.postRepository.findAll({
    //   limit: limit,
    //   offset: offset,
    // });

    const allPost = await this.postModel.find().skip(offset).limit(limit);

    if (allPost.length === 0) {
      return { message: 'Список постов пуст.' };
    }

    return allPost;
  }
}

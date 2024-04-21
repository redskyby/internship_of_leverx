import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { InjectModel as InjectMongooseModel } from '@nestjs/mongoose';
import { InjectModel as InjectSequelizeModel } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { Like } from './entities/like.entity';
import { Like as LikeMongo } from '../schemas/like.schema';
import { Model } from 'mongoose';
import { User as UserMongo } from '../schemas/user.schema';
import { Post as PostMongo } from '../schemas/post.schema';

@Injectable()
export class LikesService {
  constructor(
    @InjectSequelizeModel(User) private userRepository: typeof User,
    @InjectSequelizeModel(Post) private postRepository: typeof Post,
    @InjectSequelizeModel(Like) private likeRepository: typeof Like,
    @InjectMongooseModel(UserMongo.name) private userModel: Model<UserMongo>,
    @InjectMongooseModel(PostMongo.name) private postModel: Model<PostMongo>,
    @InjectMongooseModel(LikeMongo.name) private likeModel: Model<LikeMongo>,
  ) {}

  public async create(dto: LikeDto) {
    const { userId, postId } = dto;

    const candidate = await this.userModel.findOne({ id: userId });

    if (!candidate) {
      throw new NotFoundException('Пользователь не найден.');
    }
    const post = await this.postModel.findOne({ id: postId });

    if (!post) {
      throw new NotFoundException('Пост с таким id не существует.');
    }

    const existingLike = await this.likeModel.findOne({
      userId: candidate.id,
      postId: post.id,
    });
    if (existingLike) {
      throw new BadRequestException(
        'Лайк уже установлен для данного пользователя и поста.',
      );
    }

    const { dataValues } = await this.likeRepository.create(dto);

    const newLike1 = await new this.likeModel(dataValues);

    await newLike1.save();

    return newLike1;
  }

  public async update(dto: LikeDto) {
    const { userId, postId } = dto;

    const candidate = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!candidate) {
      throw new NotFoundException('Пользователь не найден.');
    }

    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Пост с таким id не существует.');
    }

    // Поиск индекса лайка в массиве this.likes
    const existingLike = await this.likeRepository.findOne({
      where: { userId, postId },
    });
    if (!existingLike) {
      throw new BadRequestException(
        'Лайк не найден для данного пользователя и поста.',
      );
    }

    const { id } = existingLike.dataValues;

    const deleteLike = await this.likeRepository.destroy({ where: { id } });

    return deleteLike;
  }
}

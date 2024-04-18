import { BadRequestException, Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { NotFoundException } from '../exceptions/not-found.exception';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Post } from '../posts/entities/post.entity';
import { Like } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Post) private postRepository: typeof Post,
    @InjectModel(Like) private likeRepository: typeof Like,
  ) {}

  public async create(dto: LikeDto) {
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

    const existingLike = await this.likeRepository.findOne({
      where: { userId, postId },
    });

    if (existingLike) {
      throw new BadRequestException(
        'Лайк уже установлен для данного пользователя и поста.',
      );
    }

    const newLike = await this.likeRepository.create(dto);

    return newLike;
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

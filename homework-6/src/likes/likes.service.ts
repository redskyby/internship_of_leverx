import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { User } from '../users/simpleDatabase/simpe-database-of-users';
import { Like } from './simple-database/simple-database-of-likes';
import { Post } from '../posts/simple-database/simple-database-of-posts';
import { NotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class LikesService {
  constructor(
    @Inject('LIKES') private likes: Like[],
    @Inject('USERS') private users: User[],
    @Inject('POSTS') private posts: Post[],
  ) {}

  public async create(dto: CreateLikeDto) {
    const candidate = this.users.find((item) => item.id === dto.userId);

    if (!candidate) {
      throw new NotFoundException('Пользователь не найден.');
    }

    const post = this.posts.find((item) => item.id === dto.postId);

    if (!post) {
      throw new NotFoundException('Пост с таким id не существует.');
    }

    // Проверяем, был ли уже установлен лайк пользователем для этого поста
    const existingLike = this.likes.find(
      (like) => like.userId === dto.userId && like.postId === dto.postId,
    );

    if (existingLike) {
      throw new BadRequestException(
        'Лайк уже установлен для данного пользователя и поста.',
      );
    }

    const newLike: Like = {
      userId: dto.userId,
      postId: dto.postId,
    };
    this.likes.push(newLike);

    return newLike;
  }

  public async update(dto: UpdateLikeDto) {
    const candidate = this.users.find((item) => item.id === dto.userId);

    if (!candidate) {
      throw new NotFoundException('Пользователь не найден.');
    }

    const post = this.posts.find((item) => item.id === dto.postId);

    if (!post) {
      throw new NotFoundException('Пост с таким id не существует.');
    }

    // Поиск индекса лайка в массиве this.likes
    const likeIndex = this.likes.findIndex(
      (like) => like.userId === dto.userId && like.postId === dto.postId,
    );

    if (likeIndex === -1) {
      throw new BadRequestException(
        'Лайк не найден для данного пользователя и поста.',
      );
    }

    return this.likes.splice(likeIndex, 1);
  }
}

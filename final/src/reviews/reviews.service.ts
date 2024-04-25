import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Vinyl } from '../vinyls/entities/vinyl.entity';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Vinyl) private vinylRepository: typeof Vinyl,
    @InjectModel(Review) private reviewRepository: typeof Review,
  ) {}
  public async create(dto: CreateReviewDto) {
    const { userId, vinylId } = dto;

    const candidate = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!candidate) {
      throw new NotFoundException('Такого пользователя не существует.');
    }

    const vinyl = await this.vinylRepository.findOne({
      where: { id: vinylId },
    });

    if (!vinyl) {
      throw new NotFoundException('Трека пользователя не существует.');
    }

    const existingLike = await this.reviewRepository.findOne({
      where: { userId, vinylId },
    });

    if (existingLike) {
      throw new ForbiddenException(
        'Лайк уже установлен для данного пользователя и поста.',
      );
    }

    const newReview = await this.reviewRepository.create(dto);

    return newReview;
  }

  public async findAll(offset: number, limit: number) {
    const reviews = await this.reviewRepository.findAll({
      limit: limit,
      offset: offset,
    });

    if (reviews.length === 0) {
      throw new BadRequestException(
        'Задайте другие настройки поиска или список пуст.',
      );
    }

    return reviews;
  }

  public async remove(id: number) {
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (!review) {
      throw new NotFoundException('Отзывов с таким id не существует.');
    }

    await this.reviewRepository.destroy({ where: { id } });

    return { message: 'Отзыв удален.' };
  }
}

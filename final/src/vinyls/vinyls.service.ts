import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { UpdateVinylDto } from './dto/update-vinyl.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Vinyl } from './entities/vinyl.entity';
import { Review } from '../reviews/entities/review.entity';
import { Sequelize } from 'sequelize';

@Injectable()
export class VinylsService {
  constructor(
    @InjectModel(Vinyl) private vinylRepository: typeof Vinyl,
    @InjectModel(Review) private reviewRepository: typeof Review,
  ) {}
  public async create(dto: CreateVinylDto) {
    const vinyl = await this.vinylRepository.findOne({
      where: { name: dto.name },
    });

    if (vinyl) {
      throw new ForbiddenException('Пластинка с таким именем уже существует.');
    }

    const newVinyl = await this.vinylRepository.create(dto);

    return newVinyl;
  }

  public async findAll(offset: number, limit: number) {
    const vinyls = await this.vinylRepository.findAll({
      include: [
        {
          model: Review,
          as: 'reviews',
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [Sequelize.fn('AVG', Sequelize.col('reviews.review')), 'avgRating'],
        ],
      },
      raw: true,
      group: ['Vinyl.id'],
      limit,
      offset,
    });

    if (vinyls.length === 0) {
      throw new BadRequestException(
        'Задайте другие настройки поиска или список пуст.',
      );
    }

    return vinyls;
  }

  public async update(dto: UpdateVinylDto) {}

  remove(id: number) {
    return `This action removes a #${id} vinyl`;
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { JwtModule } from '@nestjs/jwt';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let reviewsService: ReviewsService;

  const mockReviewsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      imports: [
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [
        {
          provide: ReviewsService,
          useValue: mockReviewsService,
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a review', async () => {
    const createReviewDto: CreateReviewDto = {
      review: 10,
      vinylId: 1,
      userId: 1,
    };

    const mockReviewDto = {
      review: 10,
      vinylId: 1,
      userId: 1,
    };

    mockReviewsService.create.mockResolvedValue(mockReviewDto);

    const result = await controller.create(createReviewDto);

    await expect(reviewsService.create).toHaveBeenCalledWith(createReviewDto);
    await expect(result).toEqual(mockReviewDto);
  });

  it('should return error when user not found', async () => {
    const createReviewDto: CreateReviewDto = {
      review: 10,
      vinylId: 1,
      userId: 1,
    };

    mockReviewsService.create.mockRejectedValue(
      new NotFoundException('Такого пользователя не существует.'),
    );

    await expect(controller.create(createReviewDto)).rejects.toThrow(
      NotFoundException,
    );
    await expect(controller.create(createReviewDto)).rejects.toThrow(
      'Такого пользователя не существует',
    );
  });

  it('should return error the vinyl not found', async () => {
    const createReviewDto: CreateReviewDto = {
      review: 10,
      vinylId: 1,
      userId: 1,
    };

    mockReviewsService.create.mockRejectedValue(
      new NotFoundException('Трека пользователя не существует.'),
    );

    await expect(controller.create(createReviewDto)).rejects.toThrow(
      NotFoundException,
    );
    await expect(controller.create(createReviewDto)).rejects.toThrow(
      'Трека пользователя не существует.',
    );
  });

  it('should return error when the vinyl has  a review', async () => {
    const createReviewDto: CreateReviewDto = {
      review: 10,
      vinylId: 1,
      userId: 1,
    };

    mockReviewsService.create.mockRejectedValue(
      new ForbiddenException(
        'Лайк уже установлен для данного пользователя и поста.',
      ),
    );

    await expect(controller.create(createReviewDto)).rejects.toThrow(
      ForbiddenException,
    );
    await expect(controller.create(createReviewDto)).rejects.toThrow(
      'Лайк уже установлен для данного пользователя и поста.',
    );
  });

  it('should find all reviews with pagination', async () => {
    const offset = 0;
    const limit = 10;

    const reviews = [
      {
        review: 10,
        vinylId: 1,
        userId: 1,
      },
      {
        review: 9,
        vinylId: 2,
        userId: 1,
      },
    ];

    mockReviewsService.findAll.mockResolvedValue(reviews);

    const result = await controller.findAll(offset, limit);

    await expect(mockReviewsService.findAll).toHaveBeenCalledWith(
      offset,
      limit,
    );
    await expect(result).toEqual(reviews);
  });

  it('should return error find all reviews with pagination', async () => {
    const offset = 0;
    const limit = 0;

    mockReviewsService.findAll.mockRejectedValue(
      new BadRequestException(
        'Задайте другие настройки поиска или список пуст.',
      ),
    );

    await expect(controller.findAll(offset, limit)).rejects.toThrow(
      BadRequestException,
    );
    await expect(controller.findAll(offset, limit)).rejects.toThrow(
      'Задайте другие настройки поиска или список пуст.',
    );
  });

  it('should remove a review by ID', async () => {
    const id: number = 1;

    const mockAnswer = { message: 'Отзыв удален.' };
    mockReviewsService.remove.mockResolvedValue(mockAnswer);

    const result = await controller.remove(id);

    await expect(mockReviewsService.remove).toHaveBeenCalledWith(id);
    await expect(result).toEqual(mockAnswer);
  });

  it('should remove a review by ID', async () => {
    const id: number = 1;

    mockReviewsService.remove.mockRejectedValue(
      new NotFoundException('Отзывов с таким id не существует.'),
    );

    await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    await expect(controller.remove(id)).rejects.toThrow(
      'Отзывов с таким id не существует.',
    );
  });
});

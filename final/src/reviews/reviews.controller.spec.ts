import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { JwtModule } from '@nestjs/jwt';
import { CreateReviewDto } from './dto/create-review.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

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
});

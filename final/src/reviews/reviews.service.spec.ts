import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { JwtModule } from '@nestjs/jwt';
import { CreateReviewDto } from './dto/create-review.dto';
import { VinylsService } from '../vinyls/vinyls.service';
import { UsersService } from '../users/users.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ReviewsService', () => {
  let service: ReviewsService;

  const mockReviewRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
    remove: jest.fn(),
  };

  const mockVinylRepository = {
    findOne: jest.fn(),
  };

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [
        ReviewsService,
        {
          provide: ReviewsService,
          useValue: mockReviewRepository,
        },
        {
          provide: VinylsService,
          useValue: mockVinylRepository,
        },
        {
          provide: UsersService,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

    mockReviewRepository.create.mockResolvedValue(mockReviewDto);

    const result = await service.create(createReviewDto);

    await expect(mockReviewRepository.create).toHaveBeenCalledWith(
      createReviewDto,
    );
    await expect(result).toEqual(mockReviewDto);
  });

  it('should throw NotFoundException if user does not exist', async () => {
    const createReviewDto: CreateReviewDto = {
      review: 10,
      vinylId: 1,
      userId: 1,
    };

    mockReviewRepository.create.mockRejectedValue(
      new NotFoundException('Такого пользователя не существует.'),
    );

    await expect(service.create(createReviewDto)).rejects.toThrow(
      NotFoundException,
    );
    await expect(service.create(createReviewDto)).rejects.toThrow(
      'Такого пользователя не существует.',
    );
  });

  it('should find all reviews', async () => {
    const offset = 0;
    const limit = 10;
    const mockReviews = [
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

    mockReviewRepository.findAll.mockResolvedValueOnce(mockReviews);

    const result = await service.findAll(offset, limit);

    await expect(mockReviewRepository.findAll).toHaveBeenCalledWith(
      offset,
      limit,
    );
    await expect(result).toEqual(mockReviews);
  });

  it('should throw BadRequestException if no reviews found', async () => {
    const offset = 0;
    const limit = 10;

    mockReviewRepository.findAll.mockRejectedValue(
      new BadRequestException(
        'Задайте другие настройки поиска или список пуст.',
      ),
    );

    await expect(service.findAll(offset, limit)).rejects.toThrow(
      BadRequestException,
    );
    await expect(service.findAll(offset, limit)).rejects.toThrow(
      'Задайте другие настройки поиска или список пуст.',
    );
  });
});

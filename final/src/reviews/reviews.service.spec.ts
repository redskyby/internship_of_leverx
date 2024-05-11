import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { JwtModule } from '@nestjs/jwt';
import { CreateReviewDto } from './dto/create-review.dto';
import { VinylsService } from '../vinyls/vinyls.service';
import { UsersService } from '../users/users.service';

describe('ReviewsService', () => {
  let service: ReviewsService;

  const mockReviewRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    destroy: jest.fn(),
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

    mockReviewRepository.create.mockResolvedValue(mockReviewDto)

    const result = await service.create(createReviewDto)

    await expect(mockReviewRepository.create).toHaveBeenCalledWith(createReviewDto)
    await expect(result).toEqual(mockReviewDto)
  });
});

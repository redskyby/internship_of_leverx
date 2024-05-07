import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { JwtModule } from '@nestjs/jwt';

describe('ReviewsService', () => {
  let service: ReviewsService;

  const mockReviewsService = {};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

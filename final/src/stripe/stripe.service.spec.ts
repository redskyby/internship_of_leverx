import { Test, TestingModule } from '@nestjs/testing';
import { StripeService } from './stripe.service';
import { JwtModule } from '@nestjs/jwt';

describe('StripeService', () => {
  let service: StripeService;

  const mockStripeService = {};

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
          provide: StripeService,
          useValue: mockStripeService,
        },
      ],
    }).compile();

    service = module.get<StripeService>(StripeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

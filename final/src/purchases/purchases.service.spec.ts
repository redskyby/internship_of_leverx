import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesService } from './purchases.service';
import { JwtModule } from '@nestjs/jwt';

describe('PurchasesService', () => {
  let service: PurchasesService;

  const mockPurchasesService = {};

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
          provide: PurchasesService,
          useValue: mockPurchasesService,
        },
      ],
    }).compile();

    service = module.get<PurchasesService>(PurchasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

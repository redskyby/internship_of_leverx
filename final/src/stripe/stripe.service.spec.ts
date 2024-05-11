import { Test, TestingModule } from '@nestjs/testing';
import { StripeService } from './stripe.service';
import { JwtModule } from '@nestjs/jwt';
import { PurchasesService } from '../purchases/purchases.service';
import { MailService } from '../mail/mail.service';

describe('StripeService', () => {
  let service: StripeService;

  const mockStripeService = {
    createPayments: jest.fn(),
    success: jest.fn(),
    cancel: jest.fn(),
  };
  const mockMailService = {
    sendNewInformation: jest.fn(),
  };

  const mockPurchasesService = {
    findUserByEmail: jest.fn(),
    findPurchaseById: jest.fn(),
    remove: jest.fn(),
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
        {
          provide: StripeService,
          useValue: mockStripeService,
        },
        {
          provide: PurchasesService,
          useValue: mockPurchasesService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    service = module.get<StripeService>(StripeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

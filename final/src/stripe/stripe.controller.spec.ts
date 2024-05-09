import { Test, TestingModule } from '@nestjs/testing';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { JwtModule } from '@nestjs/jwt';
import { PurchasesService } from '../purchases/purchases.service';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';
import { Request } from 'express';

describe('StripeController', () => {
  let controller: StripeController;
  let stripeService: StripeService;

  const mockStripeService = {
    createPayments: jest.fn(),
  };

  const mockPurchasesService = {
    findUserByEmail: jest.fn(),
    findPurchaseById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeController],
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
      ],
    }).compile();

    controller = module.get<StripeController>(StripeController);
    stripeService = module.get<StripeService>(StripeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a payment', async () => {
    const createStripeDto: CreateStripeDto = {
      email: 'pashadocenko@gmail.com',
      vinylId: 1,
    };

    const user: AllInformationUserDto = {
      name: 'Pavel',
      id: 1,
      lastName: 'Dotsenko',
      email: 'pashadocenko@gmail.com',
      birthdate: '2020-10-12',
      avatar: 'funny.jpg',
      roles: [],
      iat: 1744521,
      exp: 45484,
    };

    const mockAnswer = { url: 'http://example.com/success' };

    mockStripeService.createPayments.mockResolvedValue(mockAnswer);

    const result = await controller.create(createStripeDto, {
      user,
    } as Request);
    await expect(stripeService.createPayments).toHaveBeenCalledWith(
      createStripeDto,
      user,
    );
    await expect(result).toEqual(mockAnswer);
  });
});

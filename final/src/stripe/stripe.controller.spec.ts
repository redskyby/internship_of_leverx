import { Test, TestingModule } from '@nestjs/testing';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { JwtModule } from '@nestjs/jwt';
import { PurchasesService } from '../purchases/purchases.service';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';
import { Request } from 'express';
import { NotFoundException } from '@nestjs/common';

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

  it('should throw NotFoundException if user not found', async () => {
    const createStripeDto: CreateStripeDto = {
      email: 'pashadocenko@gmail.com',
      vinylId: 1,
    };

    const user: AllInformationUserDto = {
      name: 'Pavel',
      id: 1,
      lastName: 'Dotsenko',
      email: 'test@gmail.com',
      birthdate: '2020-10-12',
      avatar: 'funny.jpg',
      roles: [],
      iat: 1744521,
      exp: 45484,
    };

    mockPurchasesService.findUserByEmail.mockRejectedValue(null);
    mockStripeService.createPayments.mockRejectedValue(
      new NotFoundException('Такого пользователя не существует.'),
    );

    await expect(
      controller.create(createStripeDto, { user } as Request),
    ).rejects.toThrow(NotFoundException);
    await expect(
      controller.create(createStripeDto, { user } as Request),
    ).rejects.toThrow('Такого пользователя не существует.');
  });

  it('should throw NotFoundException if no purchase found', async () => {
    const createStripeDto: CreateStripeDto = {
      email: 'pashadocenko@gmail.com',
      vinylId: 1,
    };

    const user: AllInformationUserDto = {
      name: 'Pavel',
      id: 1,
      lastName: 'Dotsenko',
      email: 'test@gmail.com',
      birthdate: '2020-10-12',
      avatar: 'funny.jpg',
      roles: [],
      iat: 1744521,
      exp: 45484,
    };

    const mockUser = {
      email: 'unknown@gmail.com',
    };

    mockPurchasesService.findUserByEmail.mockResolvedValue(mockUser);
    mockPurchasesService.findPurchaseById.mockRejectedValue(null);
    mockStripeService.createPayments.mockRejectedValue(
      new NotFoundException('Корзина пуста.'),
    );

    await expect(
      controller.create(createStripeDto, { user } as Request),
    ).rejects.toThrow(NotFoundException);
    await expect(
      controller.create(createStripeDto, { user } as Request),
    ).rejects.toThrow('Корзина пуста.');
  });
});

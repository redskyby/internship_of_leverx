import { Test, TestingModule } from '@nestjs/testing';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { JwtModule } from '@nestjs/jwt';
import { PurchasesService } from '../purchases/purchases.service';
import { CreateStripeDto } from './dto/create-stripe.dto';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';
import { Request } from 'express';
import { NotFoundException } from '@nestjs/common';
import { SendInformationDto } from './dto/send-information.dto';
import { MailService } from '../mail/mail.service';

describe('StripeController', () => {
  let controller: StripeController;
  let stripeService: StripeService;

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
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    controller = module.get<StripeController>(StripeController);
    stripeService = module.get<StripeService>(StripeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  it('should return stripe success', async () => {
    const dto: SendInformationDto = {
      email: 'example@gmail.com',
      name: 'John Doe',
    };

    const mockResponse = {
      message: 'Спасибо за оплату, ваш платеж обрабатывается.',
    };

    mockStripeService.success.mockResolvedValue(mockResponse);

    const result = await controller.stripeSuccess(dto);

    await expect(stripeService.success).toHaveBeenCalledWith(dto);
    await expect(result).toEqual(mockResponse);
  });
});

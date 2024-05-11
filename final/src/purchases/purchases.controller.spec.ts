import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesController } from './purchases.controller';
import { PurchasesService } from './purchases.service';
import { JwtModule } from '@nestjs/jwt';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { NotFoundException } from '@nestjs/common';

describe('PurchasesController', () => {
  let controller: PurchasesController;
  let purchasesService: PurchasesService;

  const mockPurchasesService = {
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchasesController],
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

    controller = module.get<PurchasesController>(PurchasesController);
    purchasesService = module.get<PurchasesService>(PurchasesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new purchase', async () => {
      const createDto: CreatePurchaseDto = {
        email: 'pashadocenko@gmail.com',
        vinylId: 1,
        count: 2,
      };

      const mockResult = {
        name: 'newVinyl',
        price: 10,
        author: 'Pasha',
        description: 'song for Gods',
        count: 2,
        userId: 1,
      };
      mockPurchasesService.create.mockResolvedValue(mockResult);

      const result = await controller.create(createDto);

      await expect(mockPurchasesService.create).toHaveBeenCalledWith(createDto);
      await expect(result).toEqual(mockResult);
    });

    it('should return error when create a new purchase', async () => {
      const createDto: CreatePurchaseDto = {
        email: 'test@gmail.com',
        vinylId: 1,
        count: 2,
      };

      mockPurchasesService.create.mockRejectedValue(
        new NotFoundException('Нет такого пользователя.'),
      );

      await expect(purchasesService.create(createDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(purchasesService.create(createDto)).rejects.toThrow(
        'Нет такого пользователя.',
      );
    });
  });

  describe('remove', () => {
    it('should remove a purchase by ID', async () => {
      const mockReq: any = { user: { id: 1 } };
      const mockAnswer = { message: 'Покупка успешна удалена' };

      mockPurchasesService.remove.mockResolvedValue(mockAnswer);

      const result = await controller.remove(mockReq);

      await expect(mockPurchasesService.remove).toHaveBeenCalledWith(1);
      await expect(result).toEqual(mockAnswer);
    });

    it('should return error when remove a purchase by ID', async () => {
      mockPurchasesService.remove.mockRejectedValue(
        new NotFoundException('Нет покупок, связанных с данным пользователем.'),
      );

      await expect(purchasesService.remove(1)).rejects.toThrow(
        NotFoundException,
      );
      await expect(purchasesService.remove(1)).rejects.toThrow(
        'Нет покупок, связанных с данным пользователем.',
      );
    });
  });
});

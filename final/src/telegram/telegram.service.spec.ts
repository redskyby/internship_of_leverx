import { Test, TestingModule } from '@nestjs/testing';
import { TelegramService } from './telegram.service';
import { JwtModule } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import { VinylsService } from '../vinyls/vinyls.service';

describe('TelegramService', () => {
  let service: TelegramService;

  const mockTelegramService = {
    create: jest.fn(),
  };
  const mockVinylsService = {
    findById: jest.fn(),
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
          provide: TelegramService,
          useValue: mockTelegramService,
        },
        {
          provide: VinylsService,
          useValue: mockVinylsService,
        },
      ],
    }).compile();

    service = module.get<TelegramService>(TelegramService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a message', async () => {
    const id: number = 1;
    const vinyl = {
      id: 1,
      name: 'test',
      price: 999,
      author: 'The Beatles',
      description: 'test',
      createdAt: '2024-04-28T19:28:12.000Z',
      updatedAt: '2024-04-28T19:36:26.000Z',
      avgRating: '1.0000',
    };

    const mockAnswer = { message: 'Сообщение успешно отправлено' };

    mockVinylsService.findById.mockResolvedValue(vinyl);
    mockTelegramService.create.mockResolvedValue(mockAnswer);

    const result = await service.create(id);

    await expect(mockTelegramService.create).toHaveBeenCalledWith(id);
    await expect(result).toEqual(mockAnswer);
  });

  it('should return NotFoundException', async () => {
    const id: number = 999;

    mockVinylsService.findById.mockRejectedValue(null);
    mockTelegramService.create.mockRejectedValue(
      new NotFoundException('Пластинок с таким id не существует.'),
    );

    await expect(service.create(id)).rejects.toThrow(NotFoundException);
    await expect(service.create(id)).rejects.toThrow(
      'Пластинок с таким id не существует.',
    );
  });
});

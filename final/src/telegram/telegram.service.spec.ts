import { Test, TestingModule } from '@nestjs/testing';
import { TelegramService } from './telegram.service';
import { JwtModule } from '@nestjs/jwt';

describe('TelegramService', () => {
  let service: TelegramService;

  const mockTelegramService = {
    findById: jest.fn(),
    create: jest.fn(),
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
      ],
    }).compile();

    service = module.get<TelegramService>(TelegramService);
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

    mockTelegramService.findById.mockResolvedValue(vinyl);
    mockTelegramService.create.mockResolvedValue(mockAnswer);

    const result = await service.create(id);

    await expect(mockTelegramService.create).toHaveBeenCalledWith(id);
    await expect(result).toEqual(mockAnswer);
  });
});

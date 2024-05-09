import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';

describe('TelegramController', () => {
  let controller: TelegramController;
  let telegramService: TelegramService;

  const mockTelegramService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegramController],
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

    controller = module.get<TelegramController>(TelegramController);
    telegramService = module.get<TelegramService>(TelegramService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a message', async () => {
    const id: number = 1;

    const mockAnswer = { message: 'Сообщение успешно отправлено' };

    mockTelegramService.create.mockResolvedValue(mockAnswer);

    const result = await controller.sendMessage(id);

    await expect(telegramService.create).toHaveBeenCalledWith(id);
    await expect(result).toEqual(mockAnswer);
  });
});

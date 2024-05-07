import { Test, TestingModule } from '@nestjs/testing';
import { TelegramService } from './telegram.service';
import { JwtModule } from '@nestjs/jwt';

describe('TelegramService', () => {
  let service: TelegramService;

  const mockTelegramService = {};

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
});

import { Test, TestingModule } from '@nestjs/testing';
import { VinylsService } from './vinyls.service';
import { JwtModule } from '@nestjs/jwt';

describe('VinylsService', () => {
  let service: VinylsService;

  const mockVinylService = {};
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
          provide: VinylsService,
          useValue: mockVinylService,
        },
      ],
    }).compile();

    service = module.get<VinylsService>(VinylsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

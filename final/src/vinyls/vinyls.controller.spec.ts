import { Test, TestingModule } from '@nestjs/testing';
import { VinylsController } from './vinyls.controller';
import { VinylsService } from './vinyls.service';
import { JwtModule } from '@nestjs/jwt';

describe('VinylsController', () => {
  let controller: VinylsController;
  let vinylService: VinylsService;

  const mockVinylService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VinylsController],
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

    controller = module.get<VinylsController>(VinylsController);
    vinylService = module.get<VinylsService>(VinylsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

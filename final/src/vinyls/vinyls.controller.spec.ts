import { Test, TestingModule } from '@nestjs/testing';
import { VinylsController } from './vinyls.controller';
import { VinylsService } from './vinyls.service';
import { JwtModule } from '@nestjs/jwt';
import {CreateVinylDto} from "./dto/create-vinyl.dto";

describe('VinylsController', () => {
  let controller: VinylsController;
  let vinylService: VinylsService;

  const mockVinylService = {
    create : jest.fn(),
  };

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

  it('should be defined', async () => {
    expect(controller).toBeDefined();
  });

  it('should create a vinyl', async () => {
      const vinyl : CreateVinylDto = {
        name : "newVinyl",
        price : 10,
        author : "Pasha",
        description : "song for Gods"
      }

      const mockVinyl : CreateVinylDto = {
        name : "newVinyl1",
        price : 12,
        author : "Pasha2",
        description : "song for Gods2"
      }

      mockVinylService.create.mockResolvedValue(mockVinyl)

      const result = await controller.create(vinyl);

      await expect(vinylService.create).toHaveBeenCalledWith(vinyl)
    await  expect(result).toEqual(mockVinyl);

  });
});

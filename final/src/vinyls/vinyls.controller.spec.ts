import { Test, TestingModule } from '@nestjs/testing';
import { VinylsController } from './vinyls.controller';
import { VinylsService } from './vinyls.service';
import { JwtModule } from '@nestjs/jwt';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { BadRequestException, ForbiddenException } from '@nestjs/common';

describe('VinylsController', () => {
  let controller: VinylsController;
  let vinylService: VinylsService;

  const mockVinylService = {
    create: jest.fn(),
    findAll: jest.fn(),
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
    const vinyl: CreateVinylDto = {
      name: 'newVinyl',
      price: 10,
      author: 'Pasha',
      description: 'song for Gods',
    };

    const mockVinyl: CreateVinylDto = {
      name: 'newVinyl1',
      price: 12,
      author: 'Pasha2',
      description: 'song for Gods2',
    };

    mockVinylService.create.mockResolvedValue(mockVinyl);

    const result = await controller.create(vinyl);

    await expect(vinylService.create).toHaveBeenCalledWith(vinyl);
    await expect(result).toEqual(mockVinyl);
  });

  it('should show ForbiddenException', async () => {
    const vinyl: CreateVinylDto = {
      name: 'newVinyl',
      price: 10,
      author: 'Pasha',
      description: 'song for Gods',
    };

    mockVinylService.create.mockRejectedValue(
      new ForbiddenException('Пластинка с таким именем уже существует.'),
    );

    await expect(controller.create(vinyl)).rejects.toThrow(ForbiddenException);
    await expect(controller.create(vinyl)).rejects.toThrow(
      'Пластинка с таким именем уже существует.',
    );
  });

  it('should return vinyls with limit and offset', async () => {
    const mockVinyls: CreateVinylDto[] = [
      {
        name: 'newVinyl',
        price: 10,
        author: 'Pasha',
        description: 'song for Gods',
      },
      {
        name: 'newVinyl2',
        price: 12,
        author: 'Pasha2',
        description: 'song for Gods2',
      },
    ];
    const offset: number = 10;
    const limit: number = 2;

    mockVinylService.findAll.mockResolvedValue(mockVinyls);

    const result = await controller.findAll(offset, limit);
    await expect(vinylService.findAll).toHaveBeenCalledWith(offset, limit);

    await expect(result).toEqual(mockVinyls);
  });

  it('should return BadRequestException', async () => {
    const offset: number = 10;
    const limit: number = 2;

    mockVinylService.findAll.mockRejectedValue(
      new BadRequestException(
        'Задайте другие настройки поиска или список пуст.',
      ),
    );

    await expect(mockVinylService.findAll(offset, limit)).rejects.toThrow(
      BadRequestException,
    );
    await expect(mockVinylService.findAll(offset, limit)).rejects.toThrow(
      'Задайте другие настройки поиска или список пуст.',
    );
  });
});

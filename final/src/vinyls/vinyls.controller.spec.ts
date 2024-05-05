import { Test, TestingModule } from '@nestjs/testing';
import { VinylsController } from './vinyls.controller';
import { VinylsService } from './vinyls.service';
import { JwtModule } from '@nestjs/jwt';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateVinylDto } from './dto/update-vinyl.dto';
import { FindVinylDto } from './dto/find-vinyl.dto';
import { Vinyl } from './entities/vinyl.entity';
import { SortVinylDto } from './dto/sort-vinyl.dto';

describe('VinylsController', () => {
  let controller: VinylsController;
  let vinylService: VinylsService;

  const mockVinylService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findByAuthor: jest.fn(),
    sort: jest.fn(),
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

    await expect(vinylService.findAll(offset, limit)).rejects.toThrow(
      BadRequestException,
    );
    await expect(vinylService.findAll(offset, limit)).rejects.toThrow(
      'Задайте другие настройки поиска или список пуст.',
    );
  });

  it('should return new information of vinyl', async () => {
    const newVinyl: UpdateVinylDto = {
      id: 1,
      name: 'dc',
      newName: 'new dc',
      price: 10,
      newPrice: 12,
      author: 'Pasha',
      description: 'info',
      newDescription: 'new info',
    };

    const mockVinyl: UpdateVinylDto = {
      id: 1,
      name: 'dc1',
      newName: 'new dc1',
      price: 101,
      newPrice: 121,
      author: 'Pasha1',
      description: 'info1',
      newDescription: 'new info1',
    };

    mockVinylService.update.mockResolvedValue(mockVinyl);
    const result = await controller.update(newVinyl);
    await expect(vinylService.update).toHaveBeenCalledWith(newVinyl);
    await expect(result).toEqual(mockVinyl);
  });

  it('should return NotFoundException', async () => {
    const newVinyl: UpdateVinylDto = {
      id: 1,
      name: 'dc',
      newName: 'new dc',
      price: 10,
      newPrice: 12,
      author: 'Pasha',
      description: 'info',
      newDescription: 'new info',
    };

    mockVinylService.update.mockRejectedValue(
      new NotFoundException('Пластинка с таким  именем не существует.'),
    );

    await expect(mockVinylService.update(newVinyl)).rejects.toThrow(
      NotFoundException,
    );

    await expect(mockVinylService.update(newVinyl)).rejects.toThrow(
      'Пластинка с таким  именем не существует.',
    );
  });

  it('should delete the vinyl', async () => {
    const id: number = 1;

    const mockAnswer = { message: 'Информация об пластинке удалена.' };

    mockVinylService.remove.mockResolvedValue(mockAnswer);

    const result = await controller.remove(id);

    await expect(vinylService.remove).toHaveBeenCalledWith(id);
    await expect(result).toEqual(mockAnswer);
  });

  it('should show NotFoundException delete vinyl', async () => {
    const id: number = 1;

    mockVinylService.remove.mockRejectedValue(
      new NotFoundException('Пластинок с таким id не существует.'),
    );

    await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    await expect(controller.remove(id)).rejects.toThrow(
      'Пластинок с таким id не существует.',
    );
  });

  it('should return vinyls by author', async () => {
    const vinyl: FindVinylDto = {
      name: 'ds',
      author: 'Pasha',
      offset: 0,
      limit: 10,
    };

    const mockvinylS = [
      {
        id: 4,
        name: 'Back in Black1',
        price: 28,
        author: 'AC/DC',
        description: 'A high-energy rock album.',
        createdAt: '2024-04-28T19:28:12.000Z',
        updatedAt: '2024-04-28T19:28:12.000Z',
        reviews: [],
      },
      {
        id: 5,
        name: 'Back in Black1',
        price: 28,
        author: 'AC/DC',
        description: 'A high-energy rock album.',
        createdAt: '2024-04-28T19:28:12.000Z',
        updatedAt: '2024-04-28T19:28:12.000Z',
        reviews: [],
      },
    ];

    mockVinylService.findByAuthor.mockResolvedValue(mockvinylS);

    const result = await controller.findByAuthor(vinyl);

    await expect(vinylService.findByAuthor).toHaveBeenCalledWith(vinyl);
    await expect(result).toEqual(mockvinylS);
  });

  it('should return BadRequestException by author ', async () => {
    const vinyl: FindVinylDto = {
      name: 'ds',
      author: 'Pasha',
      offset: 0,
      limit: 10,
    };

    mockVinylService.findByAuthor.mockRejectedValue(
      new BadRequestException(
        'Записи не найдены или измените параметры поиска',
      ),
    );

    await expect(controller.findByAuthor(vinyl)).rejects.toThrow(
      BadRequestException,
    );
    await expect(controller.findByAuthor(vinyl)).rejects.toThrow(
      'Записи не найдены или измените параметры поиска',
    );
  });

  it('should return sort array', async () => {
    const sort: SortVinylDto = {
      sort: 'id',
      limit: 10,
      offset: 0,
    };
    const mockvinylS = [
      {
        id: 4,
        name: 'Back in Black1',
        price: 28,
        author: 'AC/DC',
        description: 'A high-energy rock album.',
        createdAt: '2024-04-28T19:28:12.000Z',
        updatedAt: '2024-04-28T19:28:12.000Z',
        reviews: [],
      },
      {
        id: 5,
        name: 'Back in Black1',
        price: 28,
        author: 'AC/DC',
        description: 'A high-energy rock album.',
        createdAt: '2024-04-28T19:28:12.000Z',
        updatedAt: '2024-04-28T19:28:12.000Z',
        reviews: [],
      },
    ];

    mockVinylService.sort.mockResolvedValue(mockvinylS);

    const result = await controller.sort(sort);
    await expect(vinylService.sort).toHaveBeenCalledWith(sort);
    await expect(result).toEqual(mockvinylS);
  });

  it('should return BadRequestException in sort array', async () => {
    const sort: SortVinylDto = {
      sort: 'id',
      limit: 10,
      offset: 0,
    };
    mockVinylService.sort.mockRejectedValue(
      new BadRequestException(
        'Записи не найдены или измените параметры поиска',
      ),
    );

    await expect(controller.sort(sort)).rejects.toThrow(BadRequestException);
    await expect(controller.sort(sort)).rejects.toThrow(
      'Записи не найдены или измените параметры поиска'
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { VinylsService } from './vinyls.service';
import { getModelToken } from '@nestjs/sequelize';
import { Vinyl } from './entities/vinyl.entity';
import { Review } from '../reviews/entities/review.entity';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { UpdateVinylDto } from './dto/update-vinyl.dto';

describe('VinylsService', () => {
  let service: VinylsService;

  const mockVinylRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const mockReviewRepository = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VinylsService,
        {
          provide: getModelToken(Vinyl),
          useValue: mockVinylRepository,
        },
        {
          provide: getModelToken(Review),
          useValue: mockReviewRepository,
        },
      ],
    }).compile();

    service = module.get<VinylsService>(VinylsService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create Vinyl', async () => {
    const vinyl: CreateVinylDto = {
      name: 'newVinyl',
      price: 10,
      author: 'Pasha',
      description: 'song for Gods',
    };

    mockVinylRepository.create.mockResolvedValue(vinyl);

    const result = await service.create(vinyl);

    expect(mockVinylRepository.create).toHaveBeenCalledWith(vinyl);
    expect(result).toEqual(vinyl);
  });

  it('should return ForbiddenException', async () => {
    const vinyl: CreateVinylDto = {
      name: 'newVinyl',
      price: 10,
      author: 'Pasha',
      description: 'song for Gods',
    };

    mockVinylRepository.create.mockRejectedValue(
      new ForbiddenException('Пластинка с таким именем уже существует.'),
    );

    await expect(service.create(vinyl)).rejects.toThrow(
      'Пластинка с таким именем уже существует.',
    );
  });

  it('should findAll vinyls', async () => {
    const offset: number = 0;
    const limit: number = 10;

    const vinyls = [
      {
        id: 1,
        name: 'test',
        price: 999,
        author: 'The Beatles',
        description: 'test',
        createdAt: '2024-04-28T19:28:12.000Z',
        updatedAt: '2024-04-28T19:36:26.000Z',
        avgRating: '1.0000',
      },
      {
        id: 2,
        name: 'The Dark Side of the Moon-new',
        price: 30,
        author: 'Pink Floyd',
        description: 'An iconic album by Pink Floyd.',
        createdAt: '2024-04-28T19:28:12.000Z',
        updatedAt: '2024-04-28T19:28:12.000Z',
        avgRating: '5.0000',
      },
    ];

    mockVinylRepository.findAll.mockResolvedValue(vinyls);

    const result = await service.findAll(offset, limit);

    expect(mockVinylRepository.findAll).toHaveBeenCalledWith(
      expect.objectContaining({
        offset: 0,
        limit: 10,
      }),
    );
    expect(result).toEqual(vinyls);
  });

  it('should return BadRequestException findAll ', async () => {
    const offset: number = 0;
    const limit: number = 10;

    mockVinylRepository.findAll.mockRejectedValue(
      new BadRequestException(
        'Задайте другие настройки поиска или список пуст.',
      ),
    );

    await expect(service.findAll(offset, limit)).rejects.toThrow(
      BadRequestException,
    );
    await expect(service.findAll(offset, limit)).rejects.toThrow(
      'Задайте другие настройки поиска или список пуст.',
    );
  });

  it('should update vinyl', async () => {
    const updateDto: UpdateVinylDto = {
      id: 1,
      name: 'old name',
      newName: 'new name',
      description: 'old description',
      newDescription: 'new description',
      price: 10,
      newPrice: 12,
      author: 'Pasha',
    };

    mockVinylRepository.findOne.mockResolvedValue({
      id: 1,
      name: 'old name',
      description: 'old description',
      price: 10,
    });

    const result = await service.update(updateDto);

    expect(mockVinylRepository.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(mockVinylRepository.update).toHaveBeenCalledWith(
      {
        name: 'new name',
        price: 12,
        description: 'new description',
      },
      { where: { id: 1 } },
    );
    expect(result).toEqual({ message: 'Информация об пластинке изменена' });
  });


});

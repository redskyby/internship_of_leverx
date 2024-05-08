import { Test, TestingModule } from '@nestjs/testing';
import { VinylsService } from './vinyls.service';
import { getModelToken } from '@nestjs/sequelize';
import { Vinyl } from './entities/vinyl.entity';
import { Review } from '../reviews/entities/review.entity';
import { CreateVinylDto } from './dto/create-vinyl.dto';
import { ForbiddenException } from '@nestjs/common';

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
});

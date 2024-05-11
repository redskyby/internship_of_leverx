import { Test, TestingModule } from '@nestjs/testing';
import { PurchasesService } from './purchases.service';
import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/sequelize';
import { Vinyl } from '../vinyls/entities/vinyl.entity';
import { User } from '../users/entities/user.entity';
import { getModelToken as getModelTokenMongo } from '@nestjs/mongoose';
import { User as UserMongo } from './schemas/user.schema';
import { Purchase as PurchaseMongo } from './schemas/purchases.schema';

describe('PurchasesService', () => {
  let service: PurchasesService;

  const mockPurchasesService = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    deleteMany: jest.fn(),
  };
  const mockUserService = {
    findOne: jest.fn(),
    updateOne: jest.fn(),
  };
  const mockVinylService = {
    findOne: jest.fn(),
  };

  const mockUserMongoService = {
    findOne: jest.fn(),
    updateOne: jest.fn(),
    save: jest.fn(),
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
        PurchasesService,
        {
          provide: getModelToken(User),
          useValue: mockUserService,
        },
        {
          provide: getModelToken(Vinyl),
          useValue: mockVinylService,
        },
        {
          provide: getModelTokenMongo(UserMongo.name),
          useValue: mockUserMongoService,
        },
        {
          provide: getModelTokenMongo(PurchaseMongo.name),
          useValue: mockPurchasesService,
        },
      ],
    }).compile();

    service = module.get<PurchasesService>(PurchasesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

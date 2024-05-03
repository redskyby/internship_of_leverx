import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import {User} from "./entities/user.entity";
import {getModelToken} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {JwtModule} from "@nestjs/jwt";

describe('UsersService', () => {
  let service: UsersService;

  // Mocked User model with required Sequelize instance methods
  const mockUserModel = {
    create: jest.fn(),
    findById: jest.fn(),
  };

  // User instance with expected instance methods
  const userWithMethods = {
    id: 1,
    name: 'Павел',
    lastName: 'Доценко',
    password: '12345',
    email: 'example@example.com',
    birthdate: new Date('2020-10-12'),
    avatar: 'funny.jpg',
    $set: jest.fn(),
    roles: [],
  };

  // Mock RolesService to return specific roles
  const mockRolesService = {
    getRoleByValue: jest.fn(),
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
        UsersService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    // Mock return value for create method to simulate expected behavior
    mockUserModel.create.mockResolvedValue(userWithMethods);
  });

  it('должен быть определен', () => {
    expect(service).toBeDefined();
  });

  it('должен создать пользователя', async () => {
    const userDto: CreateUserDto = {
      name: 'Павел',
      lastName: 'Доценко',
      password: '12345',
      email: 'example@example.com',
      birthdate: new Date('2020-10-12'),
      avatar: 'funny.jpg',
    };

    const role = { id: 1, value: 'customer' };

    // Mock the response from the role service
    mockRolesService.getRoleByValue.mockResolvedValue(role);

    // Create the user
    const result = await service.createUser(userDto);

    // Check that the `$set` method was called with the expected arguments
    expect(userWithMethods.$set).toHaveBeenCalledWith('roles', [role.id]);

    // Check that the role was obtained as expected
    expect(mockRolesService.getRoleByValue).toHaveBeenCalledWith('customer');

    // Ensure the created user has the correct roles
    expect(result.roles).toEqual([role]);
  });
});


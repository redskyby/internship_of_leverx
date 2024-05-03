import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { getModelToken } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { JwtModule } from '@nestjs/jwt';
import { AllInformationUserDto } from './dto/all-information-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  // Mocked User model with required Sequelize instance methods
  const mockUserModel = {
    create: jest.fn(),
    findOne: jest.fn(),
    destroy: jest.fn(),
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create user with role', async () => {
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

  it('should throw an error when creating a user with an existing email', async () => {
    const userDto: CreateUserDto = {
      name: 'Павел',
      lastName: 'Доценко',
      password: '12345',
      email: 'example@example.com',
      birthdate: new Date('2020-10-12'),
      avatar: 'funny.jpg',
    };

    mockUserModel.create.mockRejectedValue(
      new Error('User with this email already exists'),
    );

    await expect(service.createUser(userDto)).rejects.toThrow(
      'User with this email already exists',
    );
  });

  it('should show all information', async () => {
    const email = 'example@example.com';
    const userDto: AllInformationUserDto = {
      id: 1,
      name: 'Павел',
      lastName: 'Доценко',
      email: 'example@example.com',
      birthdate: new Date('2020-10-12').toDateString(),
      avatar: 'funny.jpg',
      roles: [],
      iat: 1,
      exp: 1,
    };

    mockUserModel.findOne.mockResolvedValue(userDto.email);

    const result = await service.showUser(userDto);

    expect(mockUserModel.findOne).toHaveBeenCalledWith({ where: { email } });

    expect(result).toEqual(userDto);
  });

  it('should show NotFoundException', async () => {
    const userDto: AllInformationUserDto = {
      id: 1,
      name: 'Павел',
      lastName: 'Доценко',
      email: 'none@none.com',
      birthdate: new Date('2020-10-12').toDateString(),
      avatar: 'funny.jpg',
      roles: [],
      iat: 1,
      exp: 1,
    };

    mockUserModel.findOne.mockResolvedValue(null);

    await expect(service.showUser(userDto)).rejects.toThrow(NotFoundException);

    await expect(service.showUser(userDto)).rejects.toThrow(
      'Пользователь не найден',
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { AllInformationUserDto } from './dto/all-information-user.dto';
import { Request, Response } from 'express';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  const mockUserService = {
    showUser: jest.fn(),
    editProfile: jest.fn(),
    deleteProfile: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all information of user', async () => {
    const user: AllInformationUserDto = {
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

    const mockUser: AllInformationUserDto = {
      id: 2,
      name: 'Павел2',
      lastName: 'Доценко2',
      email: 'none@none2.com',
      birthdate: new Date('2020-10-12').toDateString(),
      avatar: 'funny.jpg',
      roles: [],
      iat: 1,
      exp: 1,
    };

    mockUserService.showUser.mockResolvedValue(mockUser);

    const result = await controller.profile({ user } as Request);

    await expect(userService.showUser).toHaveBeenCalledWith(user);
    await expect(result).toEqual(mockUser);
  });

  it('should show NotFoundException', async () => {
    const user: AllInformationUserDto = {
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

    mockUserService.showUser.mockRejectedValue(
      new NotFoundException('Нет авторизации'),
    );

    await expect(userService.showUser(user)).rejects.toThrow(NotFoundException);

    await expect(userService.showUser(user)).rejects.toThrow('Нет авторизации');
  });

  it('should show new information of user', async () => {
    const user: AllInformationUserDto = {
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

    const newInformation: UpdateUserDto = {
      newName: 'newName',
      newLastName: 'newLastName',
      newBirthdate: new Date('2020-10-12'),
      newAvatar: 'newFunny.jpg',
    };

    const mockUser: AllInformationUserDto = {
      id: 1,
      name: 'newName',
      lastName: 'newLastName',
      email: 'none@none.com',
      birthdate: new Date('2020-10-12').toDateString(),
      avatar: 'newFunny.jpg',
      roles: [],
      iat: 1,
      exp: 1,
    };

    mockUserService.editProfile.mockResolvedValue(mockUser);

    const result = await controller.editProfile(
      { user } as Request,
      newInformation,
    );

    await expect(userService.editProfile).toHaveBeenCalledWith(
      user,
      newInformation,
    );

    await expect(result).toEqual(mockUser);
  });

  it('should show NotFoundException edit profile', async () => {
    const user: AllInformationUserDto = {
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

    const newInformation: UpdateUserDto = {
      newName: 'newName',
      newLastName: 'newLastName',
      newBirthdate: new Date('2020-10-12'),
      newAvatar: 'newFunny.jpg',
    };

    mockUserService.editProfile.mockRejectedValue(
      new NotFoundException('Пользователь не найден.'),
    );

    await expect(
      controller.editProfile({ user } as Request, newInformation),
    ).rejects.toThrow(NotFoundException);

    await expect(
      controller.editProfile({ user } as Request, newInformation),
    ).rejects.toThrow('Пользователь не найден');
  });

  it('should delete the user', async () => {
    const user: AllInformationUserDto = {
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

    const mockAnswer = { message: 'Профиль удален.' };
    const mockResponse: Response = null;

    mockUserService.deleteProfile.mockResolvedValue({
      message: 'Профиль удален.',
    });

    const result = await controller.deleteProfile(
      { user } as Request,
      mockResponse as Response,
    );

    await expect(userService.deleteProfile).toHaveBeenCalledWith(
      user,
      mockResponse,
    );

    await expect(result).toEqual(mockAnswer);
  });

  it('should show NotFoundException delete profile', async () => {
    const user: AllInformationUserDto = {
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

    const mockResponse: Response = null;

    mockUserService.deleteProfile.mockRejectedValue(
      new NotFoundException('Пользователь не найден.'),
    );

    await expect(
      controller.deleteProfile({ user } as Request, mockResponse),
    ).rejects.toThrow(NotFoundException);

    await expect(
      controller.deleteProfile({ user } as Request, mockResponse),
    ).rejects.toThrow('Пользователь не найден');
  });
});

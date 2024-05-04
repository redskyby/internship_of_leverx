import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import {AllInformationUserDto} from "./dto/all-information-user.dto";
import { Request} from 'express';
import {NotFoundException} from "@nestjs/common";
describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  const mockUserService = {
    showUser: jest.fn(),
    editProfile : jest.fn()
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
await  expect(result).toEqual(mockUser)

  });

  it("should show NotFoundException" , async ()=>{
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

    mockUserService.showUser.mockRejectedValue(new NotFoundException("Нет авторизации"));

    await expect(userService.showUser(user)).rejects.toThrow(NotFoundException)

    await expect(userService.showUser(user)).rejects.toThrow('Нет авторизации')

  })
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { DuplicateException } from '../exceptions/duplicate.exception';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    googleLogin: jest.fn(),
    login: jest.fn(),
    registration: jest.fn(),
    logOut: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should registration by google', async () => {
    const mockReq = undefined;

    const result = await controller.googleAuthRedirect(mockReq);

    await expect(authService.googleLogin).toHaveBeenCalledWith(mockReq);
    await expect(result).toEqual(mockReq);
  });

  it('should login by email', async () => {
    const mockUserDto: LoginUserDto = {
      email: 'pashadocenk@gmail.com',
      password: '123456',
    };

    const mockResult = { token: '12348548wqe' };

    mockAuthService.login.mockResolvedValue(mockResult);

    const result = await controller.login(mockUserDto);

    expect(authService.login).toHaveBeenCalledWith(mockUserDto);
    expect(result).toEqual(mockResult);
  });

  describe('registration', () => {
    it('should  registration ', async () => {
      const mockUserDto: CreateUserDto = {
        email: 'pashadocenk@gmail.com',
        password: '123456',
        name: 'test',
        lastName: 'test',
        birthdate: new Date(2020 - 12 - 12),
        avatar: 'funny.jpg',
      };
      const mockResult = { token: '12348548wqe' };

      mockAuthService.registration.mockResolvedValue(mockResult);

      const result = await controller.registration(mockUserDto);

      await expect(authService.registration).toHaveBeenCalledWith(mockUserDto);
      await expect(result).toEqual(mockResult);
    });

    it('should return DuplicateException', async () => {
      const mockUserDto: CreateUserDto = {
        email: 'pashadocenk@gmail.com',
        password: '123456',
        name: 'test',
        lastName: 'test',
        birthdate: new Date(2020 - 12 - 12),
        avatar: 'funny.jpg',
      };

      mockAuthService.registration.mockRejectedValue(
        new DuplicateException('Пользователь с таким email уже существует.'),
      );
      await expect(controller.registration(mockUserDto)).rejects.toThrow(
        DuplicateException,
      );
      await expect(controller.registration(mockUserDto)).rejects.toThrow(
        'Пользователь с таким email уже существует.',
      );
    });
  });

  it('should call logOut', async () => {
    const mockRes: any = {};
    const mockResult = {
      message: 'спешный выход из системы',
    };

    mockAuthService.logOut.mockResolvedValue(mockResult);
    const result = await controller.logout(mockRes);

    await expect(authService.logOut).toHaveBeenCalledWith(mockRes);
    await expect(result).toEqual(mockResult);
  });
});

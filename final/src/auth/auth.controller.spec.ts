import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';

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
    const mockReq = {};

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


});

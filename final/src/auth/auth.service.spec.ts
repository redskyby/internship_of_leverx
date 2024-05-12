import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginUserDto } from '../users/dto/login-user.dto';

describe('AuthService', () => {
  let service: AuthService;

  const mockAuthService = {
    login: jest.fn(),
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
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call login method', async () => {
    const mockUserDto: LoginUserDto = {
      email: 'pashadocenk@gmail.com',
      password: '123456',
    };

    const mockResult = { token: '12348548wqe' };

    mockAuthService.login.mockResolvedValue(mockResult);

    const result = await service.login(mockUserDto);

    expect(mockAuthService.login).toHaveBeenCalledWith(mockUserDto);
    await expect(result).toEqual(mockResult);
  });
});

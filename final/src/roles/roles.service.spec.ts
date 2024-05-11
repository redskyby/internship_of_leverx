import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { JwtModule } from '@nestjs/jwt';
import { CreateRoleDto } from './dto/create-role.dto';
import { DuplicateException } from '../exceptions/duplicate.exception';

describe('RolesService', () => {
  let service: RolesService;

  const mockRoleRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
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
          provide: RolesService,
          useValue: mockRoleRepository,
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new role', async () => {
    const roleDto: CreateRoleDto = { value: 'test_role' };
    const createdRole = { id: 1, ...roleDto, users: [] };

    mockRoleRepository.create.mockResolvedValue(createdRole);

    const result = await service.create(roleDto);

    await expect(mockRoleRepository.create).toHaveBeenCalledWith(roleDto);
    await expect(result).toEqual(createdRole);
  });

  it('should throw an error if role already exists', async () => {
    const roleDto: CreateRoleDto = { value: 'test_role' };
    mockRoleRepository.findOne.mockRejectedValue({});
    mockRoleRepository.create.mockRejectedValue(
      new DuplicateException('Такая роль уже существует'),
    );

    await expect(service.create(roleDto)).rejects.toThrow(DuplicateException);
    await expect(service.create(roleDto)).rejects.toThrow(
      'Такая роль уже существует',
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { JwtModule } from '@nestjs/jwt';
import { CreateRoleDto } from './dto/create-role.dto';
import { DuplicateException } from '../exceptions/duplicate.exception';
import { NotFoundException } from '@nestjs/common';

describe('RolesController', () => {
  let controller: RolesController;
  let rolesService: RolesService;

  const mockRolesService = {
    create: jest.fn(),
    getRoleByValue: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      imports: [
        JwtModule.register({
          secret: 'test-secret',
          signOptions: { expiresIn: '1h' },
        }),
      ],
      providers: [
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
    rolesService = module.get<RolesService>(RolesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new role', async () => {
    const roleDto: CreateRoleDto = { value: 'test_role' };

    const createdRole = { id: 1, ...roleDto, users: [] };

    mockRolesService.create.mockResolvedValue(createdRole);

    const result = await controller.create(roleDto);

    await expect(result).toEqual(createdRole);
    await expect(rolesService.create).toHaveBeenCalledWith(roleDto);
  });

  it('should throw an error if role already exists', async () => {
    const roleDto: CreateRoleDto = { value: 'test_role' };
    mockRolesService.create.mockRejectedValue(
      new DuplicateException('Такая роль уже существует'),
    );

    await expect(controller.create(roleDto)).rejects.toThrow(
      DuplicateException,
    );
    await expect(controller.create(roleDto)).rejects.toThrow(
      'Такая роль уже существует',
    );
  });

  it('should return a role by its value', async () => {
    const roleValue = 'test_role';
    const role = { id: 1, name: 'Test Role', value: roleValue };
    mockRolesService.getRoleByValue.mockResolvedValue(role);

    const result = await controller.getByValue(roleValue);

    await expect(rolesService.getRoleByValue).toHaveBeenCalledWith(roleValue);
    await expect(result).toEqual(role);
  });

  it('should throw an error if role does not exist', async () => {
    const roleValue = 'test-role';
    mockRolesService.getRoleByValue.mockRejectedValue(
      new NotFoundException('Такая роль не существует'),
    );

    await expect(controller.getByValue(roleValue)).rejects.toThrow(
      NotFoundException,
    );
    await expect(controller.getByValue(roleValue)).rejects.toThrow(
      'Такая роль не существует',
    );
  });
});

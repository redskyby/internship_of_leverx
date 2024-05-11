import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { JwtModule } from '@nestjs/jwt';
import {CreateRoleDto} from "./dto/create-role.dto";

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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new role', async () => {
    const roleDto: CreateRoleDto = { value: 'test_role' };

    const createdRole = { id: 1, ...roleDto , users : [] };

    mockRolesService.create.mockResolvedValue(createdRole);

    const result = await controller.create(roleDto);

    await expect(result).toEqual(createdRole);
    await expect(mockRolesService.create).toHaveBeenCalledWith(roleDto);
  });


});

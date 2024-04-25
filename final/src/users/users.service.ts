import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}
  public async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('customer');

    await user.$set('roles', [role.id]);
    user.roles = [role];

    return user;
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
      include: [
        {
          model: Role,
          as: 'roles',
          through: { attributes: [] },
        },
      ],
    });

    return user;
  }
}

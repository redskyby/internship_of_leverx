import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/entities/role.entity';
import { AllInformationUserDto } from './dto/all-information-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    private jwtService: JwtService,
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

  public async showUser(user: AllInformationUserDto) {
    const candidate = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (!candidate) {
      throw new NotFoundException('Пользователь не найден.');
    }

    return user;
  }

  public async editProfile(user: AllInformationUserDto, dto: UpdateUserDto) {
    const { email } = user;
    const { newName, newLastName, newBirthdate, newAvatar } = dto;
    const candidate = await this.userRepository.findOne({ where: { email } });

    if (!candidate) {
      throw new NotFoundException('Пользователь не найден.');
    }

    candidate.name = dto.newName;
    candidate.lastName = dto.newLastName;

    await this.userRepository.update(
      {
        name: newName,
        lastName: newLastName,
        birthdate: newBirthdate,
        avatar: newAvatar,
      },
      {
        where: { email },
      },
    );

    const newUser1 = await this.userRepository.findOne({
      where: { email },
      include: [
        {
          model: Role,
        },
      ],
    });

    const { dataValues } = newUser1;

    const payload = {
      email: dataValues.email,
      id: dataValues.id,
      name: dataValues.name,
      lastName: dataValues.lastName,
      avatar: dataValues.avatar,
      birthdate: dataValues.birthdate,
      roles: dataValues.roles,
    };

    const token = await this.jwtService.sign(payload);

    const newUser: AllInformationUserDto = await this.jwtService.verify(token);

    return newUser;
  }

  public async deleteProfile(user: AllInformationUserDto, res: Response) {
    const { email } = user;

    const candidate = await this.userRepository.findOne({ where: { email } });

    if (!candidate) {
      throw new NotFoundException('Пользователь не найден.');
    }

    await this.userRepository.destroy({ where: { id: candidate.id } });

    // And delete cookie
    res.cookie('auth_token', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({
      message: 'Профиль удален.',
    });
  }
}

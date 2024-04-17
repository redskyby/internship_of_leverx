import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AllInformationUserDto } from './dto/all-information-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { NotFoundException } from '../exceptions/not-found.exception';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { where } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  public async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    return user;
  }

  public async login(dto: LoginUserDto) {
    const { email } = dto;

    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  public async getAllInformation(
    user: AllInformationUserDto,
  ): Promise<AllInformationUserDto> {
    return user;
  }

  public async updateSomeInformation(
    user: AllInformationUserDto,
    newInfo: UpdateUserDto,
  ) {
    const { email } = user;
    const { newName, newLastName } = newInfo;
    const candidate = await this.userRepository.findOne({ where: { email } });

    if (!candidate) {
      throw new NotFoundException('Пользователь не найден.');
    }

    candidate.name = newInfo.newName;
    candidate.lastName = newInfo.newLastName;

    await this.userRepository.update(
      {
        name: newName,
        lastName: newLastName,
      },
      {
        where: { email },
      },
    );

    await this.mailService.sendNewInformation(
      newInfo.sendToEmail,
      candidate.name,
      candidate.lastName,
    );

    const token = await this.jwtService.sign({
      id: candidate.id,
      name: candidate.name,
      lastName: candidate.lastName,
      email: candidate.email,
    });

    const newUser = await this.jwtService.verify(token);

    return newUser;
  }
}

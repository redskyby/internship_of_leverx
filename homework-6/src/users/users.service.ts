import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AllInformationUserDto } from './dto/all-information-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './simpleDatabase/simpe-database-of-users';
import { MailService } from '../mail/mail.service';
import { NotFoundException } from '../exceptions/not-found.exception';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS') private users: User[],
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  public async createUser(dto: CreateUserDto) {
    const newId = this.users.length + 1;
    const newUser = { id: newId, ...dto };

    this.users.push(newUser);

    return newUser;
  }

  public async login(dto: LoginUserDto) {
    const result = this.users.find((item) => item.email === dto.email);

    return result;
  }

  public async getUserByEmail(email: string) {
    const user = await this.users.find((item) => item.email === email);

    return user;
  }

  public async getAllInformation(user: AllInformationUserDto) {
    return user;
  }

  public async updateSomeInformation(
    user: AllInformationUserDto,
    newInfo: UpdateUserDto,
  ) {
    const candidate = this.users.find((item) => item.name === user.name);

    if (!candidate) {
      throw new NotFoundException('Пользователь не найден.');
    }

    candidate.name = newInfo.newName;
    candidate.lastName = newInfo.newLastName;

    const token = await this.jwtService.sign({
      id: candidate.id,
      name: candidate.name,
      lastname: candidate.lastName,
      email: candidate.email,
    });

    await this.mailService.sendNewInformation(
      newInfo.sendToEmail,
      candidate.name,
      candidate.lastName,
    );

    const newUser = await this.jwtService.verify(token);

    return newUser;
  }
}

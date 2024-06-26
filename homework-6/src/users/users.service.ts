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
import { Post } from '../posts/entities/post.entity';
import { Like } from '../likes/entities/like.entity';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Post) private postRepository: typeof Post,
    @InjectModel(Like) private likeRepository: typeof Like,
    private readonly sequelize: Sequelize,
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

  async getUsersWithFirstPostAndLikes(): Promise<any[]> {
    const query = `
      SELECT u.id        AS user_id,
             u.name      AS user_name,
             p.id        AS post_id,
             p.title     AS post_title,
             COUNT(l.id) AS likes_count
      FROM users u
             LEFT JOIN
           post p ON u.id = p.userId
             LEFT JOIN
           \`like\` l ON p.id = l.postId
      WHERE p.id = (SELECT MIN(p2.id)
                    FROM post p2
                    WHERE p2.userId = u.id)
      GROUP BY u.id, u.name, p.id, p.title;
    `;
    // Он выбирает столбцы id и name из таблицы users, а также столбцы id и title из таблицы post. Вместе с этим, он подсчитывает количество записей в таблице like для каждого сообщения и возвращает его как likes_count.
    //     Затем запрос объединяет таблицы users и post с помощью оператора LEFT JOIN, чтобы получить доступ к данным пользователей и их первому сообщению.
    //     Также таблица post объединяется с таблицей like с помощью LEFT JOIN, чтобы подсчитать количество лайков для каждого сообщения.
    //     В подзапросе в WHERE он выбирает минимальный id сообщения (p2.id) для каждого пользователя (u.id), чтобы получить первое сообщение каждого пользователя.
    //     Результаты группируются по user_id, user_name, post_id и post_title с помощью GROUP BY, чтобы каждая группа содержала уникальную комбинацию этих значений.

    const [results, _metadata] = await this.sequelize.query(query);
    return results;
  }
}

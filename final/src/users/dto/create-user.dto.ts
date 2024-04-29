import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ example: 'Pavel', description: 'Имя' })
  @IsString({ message: 'Имя должно быть строкой' })
  @Length(3, 10, {
    message: 'Имя должно быть длиннее 3х символов и короче 10 ',
  })
  readonly name: string;

  @ApiProperty({ example: 'Dotsenko', description: 'Фамилия' })
  @IsString({ message: 'Фамилия должно быть строкой' })
  @Length(3, 10, {
    message: 'Фамилия должно быть длиннее 3х символов и короче 10 ',
  })
  readonly lastName: string;

  @ApiProperty({ example: '12345', description: 'Пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(3, 10, {
    message: 'Пароль должно быть длиннее 3х символов и короче 10 ',
  })
  readonly password: string;

  @ApiProperty({ example: 'example@example.com', description: 'Почта' })
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Поле email не может быть пустым' })
  readonly email: string;

  @ApiProperty({ example: '2020-10-12,', description: 'Дата рождения' })
  @IsNotEmpty({ message: 'Поле даты не может быть пустым' })
  readonly birthdate: Date;

  @ApiProperty({ example: 'funny.jpg', description: 'Аватарка' })
  @IsString({ message: 'Аватар должен быть строкой' })
  @IsNotEmpty({ message: 'Аватар  не может быть пустым' })
  readonly avatar: string;
}

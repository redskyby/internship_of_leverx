import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @Length(3, 10, {
    message: 'Имя должно быть длиннее 3х символов и короче 10 ',
  })
  readonly name: string;

  @IsString({ message: 'Фамилия должно быть строкой' })
  @Length(3, 10, {
    message: 'Фамилия должно быть длиннее 3х символов и короче 10 ',
  })
  readonly lastName: string;

  @IsString({ message: 'Фамилия должно быть строкой' })
  @Length(3, 10, {
    message: 'Пароль должно быть длиннее 3х символов и короче 10 ',
  })
  readonly password: string;
  @IsEmail({}, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Поле email не может быть пустым' })
  readonly email: string;
}

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Фамилия должно быть строкой' })
  @Length(3, 10, {
    message: 'Пароль должно быть длиннее 3х символов и короче 10 ',
  })
  readonly password: string;

  // @IsEmail({ require_tld: true}, { message: 'Некорректный формат email' })
  @IsEmail({ require_tld: true }, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Поле email не может быть пустым' })
  readonly email: string;
}

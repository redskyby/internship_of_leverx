import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Фамилия должно быть строкой' })
  @Length(3, 15, {
    message: 'Пароль должно быть длиннее 3х символов и короче 15 ',
  })
  readonly password: string;

  @IsEmail({ require_tld: true }, { message: 'Некорректный формат email' })
  @IsNotEmpty({ message: 'Поле email не может быть пустым' })
  @Length(3, 25, {
    message: 'Email должен быть длиннее 3х символов и короче 25 ',
  })
  readonly email: string;
}

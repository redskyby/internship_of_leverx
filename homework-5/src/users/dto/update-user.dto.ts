import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Новое имя должно быть строкой' })
  @Length(3, 10, {
    message: 'Имя должно быть длиннее 3х символов и короче 10 ',
  })
  @IsString({ message: 'Новая фамилия должно быть строкой' })
  @Length(3, 10, {
    message: 'Фамилия должно быть длиннее 3х символов и короче 10 ',
  })
  newName: string;
  newLastName: string;

  @IsEmail({}, { message: 'Некорректный формат email' })
  sendToEmail: string;
}

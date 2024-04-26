import {  IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Новое имя должно быть строкой' })
  @Length(3, 10, {
    message: 'Имя должно быть длиннее 3х символов и короче 10 ',
  })
  readonly newName: string;

  @IsString({ message: 'Новая фамилия должно быть строкой' })
  @Length(3, 10, {
    message: 'Фамилия должно быть длиннее 3х символов и короче 10 ',
  })
  readonly newLastName: string;

  @IsNotEmpty({ message: 'Поле даты не может быть пустым' })
  readonly newBirthdate: Date;

  @IsString({ message: 'Аватар должен быть строкой' })
  @IsNotEmpty({ message: 'Аватар  не может быть пустым' })
  readonly newAvatar: string;
}

import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'Pavel', description: 'Имя' })
  @IsString({ message: 'Новое имя должно быть строкой' })
  @Length(3, 10, {
    message: 'Имя должно быть длиннее 3х символов и короче 10 ',
  })
  readonly newName: string;

  @ApiProperty({ example: 'Dotsenko', description: 'Фамилия' })
  @IsString({ message: 'Новая фамилия должно быть строкой' })
  @Length(3, 10, {
    message: 'Фамилия должно быть длиннее 3х символов и короче 10 ',
  })
  readonly newLastName: string;

  @ApiProperty({ example: '2020-10-12,', description: 'Дата рождения' })
  @IsNotEmpty({ message: 'Поле даты не может быть пустым' })
  readonly newBirthdate: Date;

  @ApiProperty({ example: 'funny.jpg', description: 'Аватарка' })
  @IsString({ message: 'Аватар должен быть строкой' })
  @IsNotEmpty({ message: 'Аватар  не может быть пустым' })
  readonly newAvatar: string;
}

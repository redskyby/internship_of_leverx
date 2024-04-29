import { IsNumber, IsPositive, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVinylDto {
  @ApiProperty({
    example: 'Dark Side of the Moon',
    description: 'Название винила',
    minLength: 3,
    maxLength: 10,
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @Length(3, 10, {
    message: 'Имя должно быть длиннее 3х символов и короче 10 ',
  })
  readonly name: string;

  @ApiProperty({
    example: 29,
    description: 'Цена винила',
  })
  @IsNumber({}, { message: 'Цена должно быть числом' })
  @IsPositive({ message: 'Цена должно быть положительным числом' })
  readonly price: number;

  @ApiProperty({
    example: 'Classic Rock Album',
    description: 'Описание винила',
    minLength: 3,
    maxLength: 100,
  })
  @ApiProperty({
    example: 'Pink Floyd',
    description: 'Имя автора или исполнителя',
    minLength: 3,
    maxLength: 10,
  })
  @IsString({ message: 'Имя автора должно быть строкой' })
  @Length(3, 10, {
    message: 'Имя автора  должно быть длиннее 3х символов и короче 10 ',
  })
  readonly author: string;

  @ApiProperty({
    example: 'Classic Rock Album',
    description: 'Описание винила',
    minLength: 3,
    maxLength: 100,
  })
  @IsString({ message: 'Описание должно быть строкой' })
  @Length(3, 100, {
    message: 'Описание  должно быть длиннее 3х символов и короче 100',
  })
  readonly description: string;
}

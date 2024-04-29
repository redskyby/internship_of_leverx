import { IsNumber, IsPositive, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVinylDto {
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор винила',
  })
  @IsNumber({}, { message: 'Id  должно быть числом' })
  @IsPositive({ message: 'Id должно быть положительным числом' })
  readonly id: number;

  @ApiProperty({
    example: 'Classic Vinyl',
    description: 'Имя винила',
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @Length(3, 10, {
    message: 'Имя должно быть длиннее 3х символов и короче 10 ',
  })
  readonly name: string;

  @ApiProperty({
    example: 'New Vinyl Name',
    description: 'Новое имя винила',
  })
  @IsString({ message: 'Новое имя должно быть строкой' })
  @Length(3, 10, {
    message: 'Новое имя должно быть длиннее 3х символов и короче 10 ',
  })
  readonly newName: string;

  @ApiProperty({
    example: 29,
    description: 'Цена винила',
  })
  @IsNumber({}, { message: 'Цена должно быть числом' })
  @IsPositive({ message: 'Цена должно быть положительным числом' })
  readonly price: number;

  @ApiProperty({
    example: 35,
    description: 'Новая цена винила',
  })
  @IsNumber({}, { message: 'Новая цена должно быть числом' })
  @IsPositive({ message: 'Новая цена должно быть положительным числом' })
  readonly newPrice: number;

  @ApiProperty({
    example: 'Pink Floyd',
    description: 'Автор или исполнитель',
  })
  @IsString({ message: 'Имя автора должно быть строкой' })
  @Length(3, 10, {
    message: 'Имя автора  должно быть длиннее 3х символов и короче 10 ',
  })
  readonly author: string;

  @ApiProperty({
    example: 'A classic vinyl album',
    description: 'Описание винила',
  })
  @IsString({ message: 'Описание должно быть строкой' })
  @Length(3, 100, {
    message: 'Описание  должно быть длиннее 3х символов и короче 100',
  })
  readonly description: string;

  @ApiProperty({
    example: 'New description for vinyl',
    description: 'Новое описание винила',
  })
  @IsString({ message: 'Новое описание должно быть строкой' })
  @Length(3, 100, {
    message: 'Новое описание  должно быть длиннее 3х символов и короче 100',
  })
  readonly newDescription: string;
}

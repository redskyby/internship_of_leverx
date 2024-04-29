import { IsNumber, IsPositive, IsString, Length, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindVinylDto {
  @ApiProperty({
    example: 'Classic Vinyl',
    description: 'Имя винилового диска',
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @Length(3, 15, {
    message: 'Имя должно быть длиннее 3х символов и короче 15',
  })
  readonly name: string;

  @ApiProperty({
    example: 'Pink Floyd',
    description: 'Имя автора или исполнителя',
  })
  @IsString({ message: 'author должно быть строкой' })
  @Length(3, 15, {
    message: 'author должно быть длиннее 3х символов и короче 15',
  })
  readonly author: string;

  @ApiProperty({
    example: 10,
    description: 'Лимит для пагинации',
  })
  @IsNumber({}, { message: 'limit должно быть числом' })
  @IsPositive({ message: 'limit должно быть положительным числом' })
  readonly limit: number;

  @ApiProperty({
    example: 0,
    description: 'Смещение для пагинации',
  })
  @IsNumber({}, { message: 'offset должно быть числом' })
  @Min(0, { message: 'offset должно быть 0 или больше' })
  readonly offset: number;
}

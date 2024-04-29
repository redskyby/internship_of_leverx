import {
  IsIn,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SortVinylDto {
  @ApiProperty({
    example: 'name',
    description: 'Метод сортировки (id, name, price, description)',
  })
  @IsString({ message: 'Метод сортировки должен быть строкой' })
  @Length(3, 10, {
    message: 'Метод сортировки должен быть длиннее 3х символов и короче 10 ',
  })
  @IsIn(['id', 'name', 'price', 'description'], {
    message:
      'Метод сортировки должен быть одним из: id , name,  price,  description',
  })
  readonly sort: string;

  @ApiProperty({
    example: 10,
    description: 'Лимит количества элементов для пагинации',
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

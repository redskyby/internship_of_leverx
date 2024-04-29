import { IsNumber, IsPositive, IsString, Length, Min } from 'class-validator';

export class FindVinylDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @Length(3, 15, {
    message: 'Имя должно быть длиннее 3х символов и короче 15',
  })
  readonly name: string;

  @IsString({ message: 'author должно быть строкой' })
  @Length(3, 15, {
    message: 'author должно быть длиннее 3х символов и короче 15',
  })
  readonly author: string;

  @IsNumber({}, { message: 'limit должно быть числом' })
  @IsPositive({ message: 'limit должно быть положительным числом' })
  readonly limit: number;

  @IsNumber({}, { message: 'offset должно быть числом' })
  @Min(0, { message: 'offset должно быть 0 или больше' })
  readonly offset: number;
}

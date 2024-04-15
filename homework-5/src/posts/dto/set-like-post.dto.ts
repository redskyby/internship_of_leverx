import { IsBoolean, IsNumber, IsPositive } from 'class-validator';

export class SetLikePostDto {
  @IsNumber({}, { message: 'Id должно быть числом' })
  @IsPositive({ message: 'Id должно быть положительным числом' })
  readonly id: number;

  @IsBoolean({ message: 'Нравится -true  , не нравиться -false' })
  readonly like: boolean;
}

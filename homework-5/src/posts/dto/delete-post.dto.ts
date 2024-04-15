import { IsNumber, IsPositive } from 'class-validator';

export class DeletePostDto {
  @IsNumber({}, { message: 'Id должно быть числом' })
  @IsPositive({ message: 'Id должно быть положительным числом' })
  readonly id: number;
}

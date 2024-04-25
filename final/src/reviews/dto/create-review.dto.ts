import { IsNumber, IsPositive } from 'class-validator';

export class CreateReviewDto {
  @IsNumber({}, { message: 'Оценка должно быть числом' })
  @IsPositive({ message: 'Оценка должно быть положительным числом' })
  readonly review: number;

  @IsNumber({}, { message: 'vinylId должно быть числом' })
  @IsPositive({ message: 'Оценка должно быть положительным числом' })
  readonly vinylId: number;

  @IsNumber({}, { message: 'vinylId User должно быть числом' })
  @IsPositive({ message: 'vinylId должно быть положительным числом' })
  readonly userId: number;
}

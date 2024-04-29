import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: 5,
    description: 'Оценка отзыва (положительное число)',
  })
  @IsNumber({}, { message: 'Оценка должно быть числом' })
  @IsPositive({ message: 'Оценка должно быть положительным числом' })
  readonly review: number;

  @ApiProperty({
    example: 1,
    description: 'ID винила, к которому относится отзыв',
  })
  @IsNumber({}, { message: 'vinylId должно быть числом' })
  @IsPositive({ message: 'Оценка должно быть положительным числом' })
  readonly vinylId: number;

  @ApiProperty({
    example: 1,
    description: 'ID пользователя, который оставляет отзыв',
  })
  @IsNumber({}, { message: 'vinylId User должно быть числом' })
  @IsPositive({ message: 'vinylId должно быть положительным числом' })
  readonly userId: number;
}

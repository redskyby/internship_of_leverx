import { IsNumber, IsPositive } from 'class-validator';

export class CreateLikeDto {
  @IsNumber({}, { message: 'Id должно быть числом' })
  @IsPositive({ message: 'Id должно быть положительным числом' })
  postId: number;

  @IsNumber({}, { message: 'Id должно быть числом' })
  @IsPositive({ message: 'Id должно быть положительным числом' })
  userId: number;
}

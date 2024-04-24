import {IsString, Length} from "class-validator";
import {Transform} from "class-transformer";

export class CreateRoleDto {
  @IsString({ message: 'Название роли должно быть строкой' })
  @Length(3, 10, {
    message: 'Название роли  должно быть длиннее 3х символов и короче 10 ',
  })
  @Transform(({ value }) => value.toLowerCase())
  readonly value: string;
}

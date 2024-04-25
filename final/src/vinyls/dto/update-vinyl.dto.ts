import { PartialType } from '@nestjs/mapped-types';
import { CreateVinylDto } from './create-vinyl.dto';

export class UpdateVinylDto extends PartialType(CreateVinylDto) {}

import { Module } from '@nestjs/common';
import { VinylsService } from './vinyls.service';
import { VinylsController } from './vinyls.controller';

@Module({
  controllers: [VinylsController],
  providers: [VinylsService],
})
export class VinylsModule {}

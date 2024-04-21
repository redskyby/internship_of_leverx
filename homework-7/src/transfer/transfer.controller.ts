import { Controller, Get, UseGuards } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @UseGuards(JwtAuthGuard)
  @Get('transfer')
  async transferDataToMongoDb() {
    await this.transferService.transferDataToMongoDb();
    return { message: 'Data transferred successfully!' };
  }
}

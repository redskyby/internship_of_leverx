import { Injectable, NotFoundException } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { VinylsService } from '../vinyls/vinyls.service';

@Injectable()
export class TelegramService {
  private readonly bot: Telegraf;
  constructor(
    private configService: ConfigService,
    private vinylsService: VinylsService,
  ) {
    this.bot = new Telegraf(this.configService.get<string>('TELEGRAM_TOKEN'));
  }

  async create(id: number) {
    const vinyl = await this.vinylsService.findById(id);

    if (!vinyl) {
      throw new NotFoundException('Пластинок с таким id не существует.');
    }
    const { dataValues } = vinyl;

    const message = `
🎵 *Название*:  ${dataValues.name}
💰 *Цена*: ${dataValues.price}$
🛒 *Ссылка на магазин*: [Здесь](http://example.com)
`;

    await this.bot.telegram.sendMessage(
      this.configService.get<string>('TELEGRAM_CHANEL'),
      message,
    );

    return { message: 'Сообщение успешно отправлено' };
  }
}

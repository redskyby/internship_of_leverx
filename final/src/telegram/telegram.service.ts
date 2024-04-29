import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {

  private readonly bot: Telegraf;
  constructor(
      private configService: ConfigService,

  ) {
    this.bot = new Telegraf(this.configService.get<string>('TELEGRAM_TOKEN'));
  }

  async create() {
    // Создать канал
    // Добавить бота админом
    // Получить id канала
    // Отправить сообщение


      const message = "hello"
      await this.bot.telegram.sendMessage(this.configService.get<string>('TELEGRAM_CHANEL'), message);

  }
}

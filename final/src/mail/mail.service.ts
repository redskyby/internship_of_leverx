import { ForbiddenException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { MailCustomOptionInterface } from '../interfaces/mail-custom-option.interface';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    const options: MailCustomOptionInterface = {
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    };

    this.transporter = nodemailer.createTransport(options);
  }

  public async sendNewInformation(sendToEmail: string, name: string) {
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_USER'),
        to: sendToEmail,
        subject: 'Успешный платеж.',
        html: `
                    <div>
                        <h1>Дорогой ${name} спасибо, что воспользовались нашими услугами.</h1>
                        <h2>Ваш платеж получен.</h2>
                    </div>
                    
                    `,
      });
    } catch (e) {
      console.error(e);
      throw new ForbiddenException(
        'Произошла ошибка при отправке обновленных данных на почту.',
      );
    }
  }
}

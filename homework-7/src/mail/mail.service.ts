import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ForbiddenException } from '../exceptions/forbidden.exception';
import { ConfigService } from '@nestjs/config';

interface CustomTransportOptions {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    const options: CustomTransportOptions = {
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

  public async sendNewInformation(
    sendToEmail: string,
    name: string,
    lastName: string,
  ) {
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_USER'),
        to: sendToEmail,
        subject: 'Новые данные',
        html: `
                    <div>
                        <h1>Новые данные.</h1>
                        <h2>новое имя: ${name}</h2>
                        <h2>новая фамилия: ${lastName}</h2>
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';
import { MailService } from '../mail/mail.service';
import { SendInformationDto } from './dto/send-information.dto';
import { PurchasesService } from '../purchases/purchases.service';

@Injectable()
export class StripeService {
  private stripe;

  constructor(
    private configService: ConfigService,
    private mailService: MailService,

    private purchasesService: PurchasesService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
    );
  }

  public async createPayments(
    createStripeDto: CreateStripeDto,
    user: AllInformationUserDto,
  ) {
    const candidate = await this.purchasesService.findUserByEmail(user.email);

    if (!candidate) {
      throw new NotFoundException('Такого пользователя не существует.');
    }

    const purchase = await this.purchasesService.findPurchaseById(candidate.id);

    if (!purchase) {
      throw new NotFoundException('Корзина пуста');
    }

    const lineItems = purchase.map((purchase) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: purchase.name,
        },
        unit_amount: purchase.price * 100,
      },
      quantity: purchase.count,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `http://localhost:5000/stripe/success?email=${user.email}&name=${user.name}`,
      cancel_url: 'http://localhost:5000/stripe/cancel',
    });

    return { url: session.url };
  }

  public async success(dto: SendInformationDto) {
    await this.mailService.sendNewInformation(dto.email, dto.name);

    const candidate = await this.purchasesService.findUserByEmail(dto.email);

    const { id } = candidate;

    await this.purchasesService.remove(id);

    return { message: 'Спасибо за оплату, ваш платеж обрабатывается.' };
  }

  public async cansel() {
    return { message: 'Произошла ошибка' };
  }
}

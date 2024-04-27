import { Injectable } from '@nestjs/common';
import { CreateStripeDto } from './dto/create-stripe.dto';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { AllInformationUserDto } from '../users/dto/all-information-user.dto';

@Injectable()
export class StripeService {
  private stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
    );
  }

  public async createPayments(
    createStripeDto: CreateStripeDto,
    user: AllInformationUserDto,
  ) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd', // Валюта
            product_data: {
              name: 'Wireless Headphones21', // Название продукта
            },
            unit_amount: 1999, // Цена за единицу в центах (19.99 доллара)
          },
          quantity: 2, // Количество
        },
      ],
      success_url: `http://localhost:5000/stripe/success?email=${user.email}&name=${user.name}`,
      cancel_url: 'http://localhost:5000/stripe/cansel',
    });

    return { url: session.url };
  }

  public async success(email: string, name: string) {}

  public async cansel() {
    return { message: 'Произошла ошибка' };
  }
}

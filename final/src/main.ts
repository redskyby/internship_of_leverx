import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());

    const config = new DocumentBuilder()
      .setTitle('Vinyl store.')
      .setDescription('Документация к серверному приложению.')
      .setVersion('1.0.0')
      .addTag('Auth', 'Эндпоинты, связанные с аутентификацией')
      .addTag('Users', 'Эндпоинты, связанные с пользователями')
      .addTag('Vinyls', 'Эндпоинты, связанные с пластинками')
      .addTag('Roles', 'Эндпоинты, связанные с ролями')
      .addTag('Reviews', 'Эндпоинты, связанные с отзывами')
      .addTag('Stripe', 'Эндпоинты, связанные с сервисом оплаты')
      .addTag(
        'Purchases',
        'Эндпоинты, связанные с добавлением товаров в корзину',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();

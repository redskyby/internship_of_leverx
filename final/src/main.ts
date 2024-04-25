import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    await app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();

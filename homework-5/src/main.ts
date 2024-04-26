import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.PORT || 7000;

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();

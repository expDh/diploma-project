import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      transform: true,
    }),
  );
  app.use(cookieParser());
  app.enableCors({  
    // origin: ['http://localhost:3001'],
    // origin: true,
    origin: [
    // 'https://diploma-inventory.vercel.app',
    // 'http://217.198.6.94',
    'https://diploma-inventory.vercel.app',
    'http://localhost:3000',
    'http://localhost:4200',
    'https://diploma-inventory.ru',
    /^https:\/\/.*-diploma-inventory\.vercel\.app$/,
    
  ],
    credentials: true,
    exposedHeaders: 'set-cookie',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],
  })

console.log(process.env.PORT)
await app.listen(process.env.PORT ?? 4200);
}
bootstrap();

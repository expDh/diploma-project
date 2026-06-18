import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.set('trust proxy', 1);
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      transform: true,
    }),
  );

  app.use(cookieParser());
  // app.enableCors({  
  //   // origin: ['http://localhost:3001'],
  //   // origin: true,
  //   origin: [
    
  //   'https://diploma-inventory.vercel.app',
  //   'http://localhost:3000',
  //   'http://localhost:4200',
  //   'https://diploma-inventory.ru',
  //   /^https:\/\/.*-diploma-inventory\.vercel\.app$/,
  //   'https://diploma-production-b922.up.railway.app',
  // ],
  //   credentials: true,
  //   exposedHeaders: 'set-cookie',
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With'],
  // })


  app.enableCors({
  origin: 'https://diploma-inventory.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// console.log(process.env.PORT)
// await app.listen(process.env.PORT ?? 4200);
  const port = process.env.PORT ?? 4200;
  console.log(`Server is running on port: ${port}`);

  await app.listen(port, '0.0.0.0');        // ←←← ЭТО САМОЕ ВАЖНОЕ
  console.log(`✅ Application is listening on http://0.0.0.0:${port}`);
}
bootstrap();

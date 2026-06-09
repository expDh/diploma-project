// // src/common/middleware/auth.middleware.ts
// import {
//   BadRequestException,
//   Injectable,
//   NestMiddleware,
// } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import * as jwt from 'jsonwebtoken';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     const token = req.cookies?.accessToken;

//     if (!token) {
//       throw new BadRequestException('Нет токена');
//     }

//     try {
//       const payload = jwt.verify(
//         token,
//         process.env.JWT_SECRET,
//       );

//       req['user'] = payload; // 👈 кладём пользователя в req
//       next();
//     } catch (e) {
//       throw new BadRequestException('Невалидный токен');
//     }
//   }
// }

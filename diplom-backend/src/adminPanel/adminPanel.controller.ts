// // src/admin-panel/admin-panel.controller.ts
// import {
//   Controller,
//   Get,
//   Post,
//   Patch,
//   Body,
//   Param,
//   UseGuards,
//   Req,
// } from '@nestjs/common';
// import type { Request } from 'express';

// import { CreateStoreDto } from '../dto/create-store.dto';
// import { UpdateStoreDto } from '../dto/update-store.dto';

// import { AdminPanelService } from './adminPanel.service';
// import { JwtAuthGuard } from '../guards/jwt-auth.guard';
// import { AdminGuard } from '../guards/admin.guard';

// @Controller('admin')
// @UseGuards(JwtAuthGuard) // ← Все маршруты требуют авторизации
// export class AdminPanelController {
//   constructor(private readonly adminPanelService: AdminPanelService) {}

//   // === Только для админов ===
//   // @UseGuards(AdminGuard)
//   // @Get('/getAllResPersons')
//   // getAllResPerson(@Req() req: Request) {
//   //   return this.adminPanelService.getAllResPerson(req['user'].id);
//   // }

//   // @UseGuards(AdminGuard)
//   // @Get('/getAllStores')
//   // getAllStores(@Req() req: Request) {
//   //   return this.adminPanelService.getAllStores(req['user'].id);
//   // }

//   // @UseGuards(AdminGuard)
//   // @Post('createStore')
//   // createStore(@Req() req: Request, @Body() dto: CreateStoreDto) {
//   //   return this.adminPanelService.createStore(req['user'].id, dto);
//   // }

//   // @UseGuards(AdminGuard)
//   // @Patch('updateStore/:id')
//   // updateStore(
//   //   @Req() req: Request,
//   //   @Param('id') id: string,
//   //   @Body() dto: UpdateStoreDto,
//   // ) {
//   //   return this.adminPanelService.updateStore(req['user'].id, +id, dto);
//   // }

//   // @UseGuards(AdminGuard)
//   // @Get('/getAllEquipments')
//   // getAllEquipments(@Req() req: Request) {
//   //   return this.adminPanelService.getAllEquipments(req['user'].id);
//   // }

//   // // Этот метод тоже лучше защитить AdminGuard'ом
//   // @UseGuards(AdminGuard)
//   // @Get('/users')
//   // getAllUsers(@Req() req: Request) {
//   //   return this.adminPanelService.getAllUsersWithRelations(req['user'].id);
//   // }
// }

// // import {
// //   Controller,
// //   Get,
// //   Req,
// //   BadRequestException,
// //   UseGuards,
// //   Patch,
// //   Post,
// //   Body,
// //   Param,
// // } from '@nestjs/common';
// // import type { Request } from 'express';
// // import * as jwt from 'jsonwebtoken';
// // import { AdminPanelService } from './adminPanel.service';
// // import { JwtGuard } from '../guards/jwt.guard';
// // import { CreateStoreDto } from '../dto/create-store.dto';
// // import { UpdateStoreDto } from '../dto/update-store.dto';

// // @Controller('admin')
// // export class AdminPanelController {
// //   constructor(private adminPanelService: AdminPanelService) {}

// //   private readonly jwtSecret = process.env.JWT_SECRET || 'secret';

// //   @Get('/users')
// //   async getAllUsers(@Req() req: Request) {
// //     const token = req.cookies['accessToken'];
// //     if (!token) throw new BadRequestException('Нет токена');

// //     const payload: any = jwt.verify(token, this.jwtSecret);

// //     return this.adminPanelService.getAllUsersWithRelations(payload.id);
// //   }
// //   /////////////////////////////////////////////////////////////////////////////////////////////////////////
// //   @UseGuards(JwtGuard)
// //   @Get('/getAllResPersons')
// //   async getAllResPerson(@Req() req: Request) {
// //     return this.adminPanelService.getAllResPerson(req['user'].id);
// //   }
// //   /////////////////////////////////////////////////////////////////////////////////////////////////////////
// //   @UseGuards(JwtGuard)
// //   @Get('/getAllStores')
// //   async getAllStores(@Req() req: Request) {
// //     return this.adminPanelService.getAllStores(req['user'].id);
// //   }
// //   @UseGuards(JwtGuard)
// //   @Post('createStore')
// //   async createStore(@Req() req, @Body() dto: CreateStoreDto) {
// //     console.log('DTO:', dto);
// //     console.log(req['user'].id);
// //     return this.adminPanelService.createStore(req['user'].id, dto);
// //   }
// //   @UseGuards(JwtGuard)
// //   @Patch('updateStore/:id')
// //   async updateStore(
// //     @Req() req,
// //     @Param('id') id: string,
// //     @Body() dto: UpdateStoreDto,
// //   ) {
// //     return this.adminPanelService.updateStore(req['user'].id, +id, dto);
// //   }
// //   /////////////////////////////////////////////////////////////////////////////////////////////////////////
// //   @UseGuards(JwtGuard)
// //   @Get('/getAllEquipments')
// //   async getAllEquipments(@Req() req: Request) {
// //     // const token = req.cookies['accessToken'];
// //     // if (!token) throw new BadRequestException('Нет токена');

// //     // const payload: any = jwt.verify(token, this.jwtSecret);

// //     return this.adminPanelService.getAllEquipments(req['user'].id);
// //   }
// // }

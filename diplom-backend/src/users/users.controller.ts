
import {
  Controller,
  Get,
  Patch,
  Delete,
  Req,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import * as jwt from 'jsonwebtoken';
import { ManagerGuard } from '../guards/manager.guard';
import { AdminOrManagerGuard } from '../guards/adminOrManager';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  

  @Get('myProfile')
  async getSelf(@Req() req: Request) {
    const token = req.cookies?.accessToken;
    if (!token) throw new UnauthorizedException('Токен отсутствует');

    const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    return this.usersService.findOne(payload.id)
  }

  @Patch('updateMyProfile')
  async updateSelf(@Req() req: Request, @Body() body: any) {
    const token = req.cookies?.accessToken;
    if (!token) throw new UnauthorizedException('Токен отсутствует');

    const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    return this.usersService.updateSelf(payload.id, body);
  }

  

  @UseGuards(JwtAuthGuard, AdminOrManagerGuard)
  @Get('free-responsibles')
  getFreeResPersons() {
    return this.usersService.getFreeResPersons();
  }

  @UseGuards(JwtAuthGuard, AdminOrManagerGuard)
  @Get('/getAllResPersons')
  getAllResPerson(@Req() req: Request) {
    return this.usersService.getAllResPerson(req['user'].id);
  }

  @UseGuards(JwtAuthGuard, AdminOrManagerGuard)
  @Patch('updateUser/:id')
  async updateAny(
    @Param('id', ParseIntPipe) targetUserId: number,
    @Body() body: any,
  ) {
    return this.usersService.updateAny(targetUserId, body);
  }

  @UseGuards(JwtAuthGuard,AdminOrManagerGuard)
  @Get('/getAllUsers')
  async getAllUsers() {
    return this.usersService.getAllUsersWithRelations();
  }

  @UseGuards(JwtAuthGuard, AdminOrManagerGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) targetUserId: number) {
    return this.usersService.deleteUser(targetUserId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}

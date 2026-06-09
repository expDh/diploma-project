import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { loginDto } from './dto/login.dto';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateAuthDto, @Res({ passthrough: true }) res: Response) {
    console.log('Received DTO:', dto);
    return this.authService.register(dto, res);
  }

  @Post('login')
  login(@Body() dto: loginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto, res);
  }
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @Post('refresh')
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    return this.authService.refreshToken(res, refreshToken);
  }
}



// import { Body, Controller, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { loginDto } from './dto/login.dto';

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}
  
// @Post('register')
// register(@Body() dto:CreateAuthDto){
//   return this.authService.register(dto)
// }

// @Post('login')
// login(@Body() dto:loginDto){
//   return this.authService.login(dto)
// }
// }







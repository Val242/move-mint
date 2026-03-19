import { Controller, Post, Body, BadRequestException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from "bcrypt"
import { json } from 'body-parser';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@UseGuards(LocalAuthGuard)

export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async signUp(@Body() registerDto: RegisterDto){
         console.log('Received DTO:', registerDto);
    return this.authService.register(registerDto);
  }
    @Post('login')
    async login(
      @Body() loginDto: LoginDto
    ){
      console.log("I am running")
      const user = await this.authService.validateUser(loginDto.email, loginDto.password)
      if(user instanceof UnauthorizedException){
        throw user
      }

      return this.authService.login(user)
    }
    }


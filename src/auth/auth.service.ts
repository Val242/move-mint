import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from "bcrypt"
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private readonly databaseService: DatabaseService, private jwtService: JwtService){}
  public async register(registerDto: RegisterDto) {
    const {email, password, username} = registerDto;
    //  if (!passwordHash) throw new BadRequestException('Password required');
    // 

    const existingUser = await this.databaseService.user.findUnique({
      where: {email}
    });
    if(existingUser){
      throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const user = this.databaseService.user.create({
      data: {
        username,         // valid now
        email,
        passwordHash: hashedPassword
      }
    });
    return user

  }

  async validateUser(email: string, password:string){
      const user = await this.databaseService.user.findUnique({
        where: {email}
      })
      if (!user){
        return new UnauthorizedException("Invalid email")
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
      if(!isPasswordValid){
        throw new UnauthorizedException("Invalid Password")
      }
      return user
  }

   async login( user: {id: number, email: string}) {

    const payload = {sub: user.id, email: user.email}
    const accessToken = this.jwtService.sign(payload,{
      expiresIn: '1h'
    })
    const refreshToken = this.jwtService.sign(payload,{
      expiresIn: '7d'
    })   

    return{
      accessToken,
      refreshToken,
      // user:{
      //   id: user.id,
      //   email: user.email
      // }
    }
   
  }}

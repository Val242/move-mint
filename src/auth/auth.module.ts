import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import {JwtModule} from "@nestjs/jwt"

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey',
      signOptions: {expiresIn: '1h'}
    }),
    DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService]

  
})

export class AuthModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth.controller';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config";

@Module({
  imports: [JwtModule.register({
    global : true,
    secret : process.env.JWT_SECRET, //We need to have an actual secret here. like encrypt it ?
    signOptions : {expiresIn : '60s'},
  })],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, PrismaService],
})
export class AppModule {}

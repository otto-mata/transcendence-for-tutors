import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config";

@Module({
  imports: [JwtModule.register({
    global : true,
    secret : process.env.JWT_SECRET,
    signOptions : {expiresIn : '15min'},
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}

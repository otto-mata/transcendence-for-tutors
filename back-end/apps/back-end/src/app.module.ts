import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config";

@Module({
  imports: [JwtModule.register({
    global : true,
    secret : process.env.jwt_secret,
    signOptions : {expiresIn : '15m'},
  })],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

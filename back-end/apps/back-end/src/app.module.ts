import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import "dotenv/config";

@Module({
  imports: [Jwtmodule.register({
    global : true,
    secret : process.env.jwt_secret,
    signoptions : {expiresin : '15m'},
  })],
  controllers: [Appcontroller],
  providers: [Appservice, Prismaservice],
})
export class AppModule {}

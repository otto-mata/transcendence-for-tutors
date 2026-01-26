import { Module } from '@nestjs/common';
import { GoogleOauthController } from './google.controller';
import { GoogleOauthService } from './google.service';
import { GoogleOauthStrategy } from './google.strategy';
import { UserService } from '@/user/user.service';
import { UserRepository } from '@/user/user.repository';
import { AuthService } from '../auth.service';
import { UserModule } from '@/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
  ],
  controllers: [GoogleOauthController],
  providers: [
    GoogleOauthService,
    GoogleOauthStrategy,
    AuthService,
    UserService,
    UserRepository,
  ],
  exports: [GoogleOauthService],
})
export class GoogleOauthModule {}

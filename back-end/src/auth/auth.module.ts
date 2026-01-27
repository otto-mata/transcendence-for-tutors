import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '@/prisma/prisma.service';
import { GoogleOauthModule } from './google/google.module';
import { FortyTwoOauthModule } from './fortytwo/fortytwo.module';

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: { expiresIn: '15m' },
			}),
		}),
		GoogleOauthModule,
		FortyTwoOauthModule,
	],
	controllers: [AuthController],
	providers: [AuthService, PrismaService],
})
export class AuthModule {}

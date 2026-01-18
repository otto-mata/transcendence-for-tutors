import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { FollowModule } from './follow/follow.module';
import { MediaModule } from './media/media.module';
import { MailModule } from './mail/mail.module';
import { GoogleOauthModule } from './auth/google/google.module';

@Module({
	imports: [
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '15m' },
		}),
		PrismaModule,
		NotificationModule,
		AuthModule,
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			cache: true,
		}),
		PostModule,
		UserModule,
		CommentModule,
		FollowModule,
		MediaModule,
		MailModule,
		GoogleOauthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

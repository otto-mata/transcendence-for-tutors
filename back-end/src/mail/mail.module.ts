import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: async (config: ConfigService) => ({
				transport: {
					host: config.get<string>('MAIL_HOST'),
					port: config.get<number>('MAIL_PORT'),
					secure: false,
					auth: {
						user: config.get<string>('MAIL_USER'),
						pass: config.get<string>('MAIL_PASS'),
					},
				},
				defaults: {
					from: `"${config.get<string>(
						'MAIL_FROM_NAME',
					)}" <${config.get<string>('MAIL_FROM_EMAIL')}>`,
				},
			}),
			inject: [ConfigService],
		}),
	],
})
export class MailModule {}

import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: async (config: ConfigService) => {
				const mailUser = config.get<string>('MAIL_USER');
				const mailPass = config.get<string>('MAIL_PASS');

				if (!mailUser || !mailPass) {
					throw new Error('MAIL_USER and MAIL_PASS must be set before starting the backend.');
				}

				return {
					transport: {
						host: config.get<string>('MAIL_HOST'),
						port: config.get<number>('MAIL_PORT'),
						secure: false,
						auth: {
							user: mailUser,
							pass: mailPass,
						},
					},
					defaults: {
						from: `"${config.get<string>(
							'MAIL_FROM_NAME',
						)}" <${config.get<string>('MAIL_FROM_EMAIL')}>`,
					},
				};
			},
			inject: [ConfigService],
		}),
	],
})
export class MailModule {}

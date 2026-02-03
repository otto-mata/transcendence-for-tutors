import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
	const httpsOptions = {
	  key: fs.readFileSync('./secrets/private-key.pem'),
 	 cert: fs.readFileSync('./secrets/public-certificate.pem'),
	};
	const app = await NestFactory.create(AppModule, {
		httpsOptions
	});
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);
	app.enableShutdownHooks();
	app.enableCors({
		origin: process.env.FRONTEND_URL || 'http://localhost:8080',
		credentials: true,
	});
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

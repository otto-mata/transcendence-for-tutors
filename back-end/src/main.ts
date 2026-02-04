import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);
	app.enableShutdownHooks();
	
	app.enableCors({
		origin: process.env.ALLOWED_ORIGINS || 'https://localhost',
		credentials: true,
	});
	
	await app.listen(process.env.PORT ?? 3000);
	console.log(`🚀 Backend running on port ${process.env.PORT ?? 3000} (HTTP internal)`);
}
bootstrap();

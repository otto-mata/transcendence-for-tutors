import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
      envFilePath: '.env', // Path to your .env file
      cache: true, // Cache environment variables for better performance
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

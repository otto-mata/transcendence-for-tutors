import { Controller, Post, Get, Param } from '@nestjs/common';
import { MockApiService } from './mock-api.service';
import { User, Post as PostModel } from '$prisma';

@Controller('mock')
export class MockApiController {
  constructor(private readonly mockApiService: MockApiService) {}

  @Post('seed')
  async seed(): Promise<string> {
    await this.mockApiService.seed();
    return 'Database seeded with mock data';
  }

  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.mockApiService.getUsers();
  }

  @Get('users/:username')
  async getUserByUsername(@Param('username') username: string): Promise<User | null> {
    return this.mockApiService.getUserByUsername(username);
  }

  @Get('posts')
  async getPosts(): Promise<PostModel[]> {
    return this.mockApiService.getPosts();
  }

  @Get('posts/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel | null> {
    return this.mockApiService.getPostById(id);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { User, Post, Comment } from '$prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MockApiService {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    await this.prisma.comment.deleteMany();
    await this.prisma.post.deleteMany();
    await this.prisma.follow.deleteMany();
    await this.prisma.user.deleteMany();

    const users = await this.createUsers();
    const posts = await this.createPosts(users);
    await this.createComments(users, posts);
    await this.createFollows(users);
  }

  private async createUsers(): Promise<User[]> {
    const users: User[] = [];
    const password = await bcrypt.hash('password', 10);
    for (let i = 0; i < 10; i++) {
      const user = await this.prisma.user.create({
        data: {
          username: `user${i}`,
          displayName: `User ${i}`,
          email: `user${i}@example.com`,
          passwordHash: password,
          bio: `This is the bio of user ${i}`,
          avatarUrl: `https://i.pravatar.cc/150?u=user${i}`,
        },
      });
      users.push(user);
    }
    return users;
  }

  private async createPosts(users: User[]): Promise<Post[]> {
    const posts: Post[] = [];
    for (const user of users) {
      for (let i = 0; i < 5; i++) {
        const post = await this.prisma.post.create({
          data: {
            content: `This is post number ${i} by ${user.username}`,
            authorId: user.id,
          },
        });
        posts.push(post);
      }
    }
    return posts;
  }

  private async createComments(users: User[], posts: Post[]): Promise<void> {
    for (const post of posts) {
      for (let i = 0; i < 3; i++) {
        const user = users[Math.floor(Math.random() * users.length)];
        await this.prisma.comment.create({
          data: {
            content: `This is comment number ${i} on post ${post.id} by ${user.username}`,
            authorId: user.id,
            postId: post.id,
          },
        });
      }
    }
  }

  private async createFollows(users: User[]): Promise<void> {
    for (const user of users) {
      for (const otherUser of users) {
        if (user.id !== otherUser.id && Math.random() > 0.5) {
          await this.prisma.follow.create({
            data: {
              followerId: user.id,
              followingId: otherUser.id,
            },
          });
        }
      }
    }
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
      include: { posts: true },
    });
  }

  async getPosts(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: { author: true, comments: true, likes: true },
    });
  }

  async getPostById(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: { author: true, comments: true, likes: true },
    });
  }
}

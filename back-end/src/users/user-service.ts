// users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

// Mocking
@Injectable()
export class UsersService {
  private users = [
    { id: 1, username: 'johndoe', displayName: 'John', bio: 'Hello world!', avatarUrl: '' },
    { id: 2, username: 'chdoe', displayName: 'Test', bio: 'AAAAAA', avatarUrl: '' }
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`User ${id} didnt exist`);
    return user;
  }

  update(id: number, updateData: any) {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex === -1) throw new NotFoundException(`User ${id} didnt exist`);

    this.users[userIndex] = { ...this.users[userIndex], ...updateData };
    return this.users[userIndex];
  }
}
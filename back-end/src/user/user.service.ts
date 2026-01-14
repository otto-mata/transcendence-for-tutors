import { Injectable } from '@nestjs/common';
import { User, Prisma } from '$prisma';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) { }

	async findById(id: number): Promise<User> {
		return this.userRepository.findById(id);
	}

	async findByLogin(login: string): Promise<User> {
		return this.userRepository.findByLogin(login);
	}

	async findByEmail(email: string): Promise<User> {
		return this.userRepository.findByEmail(email);
	}

	async findAll(skip: number, take: number): Promise<User[]> {
		return this.userRepository.findAll(skip, take);
	}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		return this.userRepository.create(data);
	}

	async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
		return this.userRepository.update(id, data);
	}

	async delete(id: number): Promise<User> {
		return this.userRepository.delete(id);
	}
}

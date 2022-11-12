import { Injectable } from '@nestjs/common';
import { User } from './user';
import { nanoid } from 'nanoid';
import { PrismaService } from '@backend/db';
import { Pagination, TimeService } from '@backend/common';

interface CreateDummyUser {
  name: string;
}

interface CreateUser {
  name: string;
}

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private timeService: TimeService
  ) {}

  async createDummyUser(params: CreateDummyUser): Promise<User> {
    return this.createUser(params);
  }

  async createUser(params: CreateUser) {
    const id = nanoid();
    const now = this.timeService.now();
    const user: User = {
      id,
      name: params.name,
      createdAt: now,
    };
    await this.prisma.user.create({
      data: {
        ...user,

        // TODO
        updatedAt: now,
      },
    });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findUsers(params?: Pagination): Promise<User[]> {
    return this.prisma.user.findMany({
      skip: params?.skip,
      take: params?.take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

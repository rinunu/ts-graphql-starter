import { Injectable } from '@nestjs/common';
import { Post } from './post';
import { nanoid } from 'nanoid';
import { PrismaService } from '@backend/db';
import { TimeService } from '@backend/common';

interface Pagination {
  take?: number;
  skip?: number;
}

interface PostInput {
  content: string;
}

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private timeService: TimeService
  ) {}

  async findByUser(userId: string, pagination?: Pagination): Promise<Post[]> {
    // この形では SQL 実行時に limit がかからないので、1ユーザーのデータ数が膨大になる場合は、 findUnique を使わない形に変えること
    return this.prisma.user.findUnique({ where: { id: userId } }).posts({
      skip: pagination?.skip,
      take: pagination?.take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAll(params: Pagination): Promise<Post[]> {
    return this.prisma.post.findMany({
      skip: params.skip,
      take: params.take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async post(me: string, params: PostInput): Promise<Post> {
    const id = nanoid();
    const now = this.timeService.now();
    const post: Post = {
      id,
      authorId: me,
      content: params.content,
      createdAt: now,
    };
    await this.prisma.post.create({
      data: post,
    });
    return post;
  }
}

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

  /**
   * ループで使用すると n+1 が発生するので注意
   */
  async findByUser(userId: string, pagination?: Pagination): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { authorId: userId },
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

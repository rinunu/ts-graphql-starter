import { PostService } from './post.service';
import { Test } from '@nestjs/testing';
import { DbModule, PrismaService } from '@backend/db';
import { CommonModule } from '@backend/common';
import { post } from './test-util/post';
import {
  cleanupDatabase,
  setupCleanupDatabase,
  setupFixtures,
} from 'prisma-test-fixture';
import { PrismaClient } from '@prisma/client';

describe('PostService', () => {
  let subject: PostService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DbModule, CommonModule],
      providers: [PostService],
    }).compile();

    subject = moduleRef.get<PostService>(PostService);
    prisma = moduleRef.get<PrismaClient>(PrismaService);

    setupCleanupDatabase(prisma);
  });

  afterEach(async () => {
    await cleanupDatabase(prisma);
  });

  it('findByUser は対象ユーザーのデータを新しいものから返す', async () => {
    await setupFixtures(prisma, () => {
      post({ id: 'p1', authorId: 'u1', createdAt: '2022-10-11' });
      post({ id: 'p2', authorId: 'u1', createdAt: '2022-10-12' });
      post({ id: 'p3', authorId: 'u2', createdAt: '2022-10-13' });
    });

    const posts = await subject.findByUser('u1');
    expect(posts.map((it) => it.id)).toStrictEqual(['p2', 'p1']);
  });

  it('findAll は全てのデータを新しいものから返す', async () => {
    await setupFixtures(prisma, () => {
      post({ id: 'p1', authorId: 'u1', createdAt: '2022-10-11' });
      post({ id: 'p2', authorId: 'u1', createdAt: '2022-10-12' });
      post({ id: 'p3', authorId: 'u2', createdAt: '2022-10-13' });
    });

    const posts = await subject.findAll({ skip: 0, take: 10 });
    expect(posts.map((it) => it.id)).toStrictEqual(['p3', 'p2', 'p1']);
  });
});

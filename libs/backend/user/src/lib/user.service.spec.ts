import { Test } from '@nestjs/testing';
import { DbModule, PrismaService } from '@backend/db';
import { CommonModule } from '@backend/common';
import { user } from './test-util/user';
import {
  cleanupDatabase,
  setupCleanupDatabase,
  setupFixtures,
} from 'prisma-test-fixture';
import { PrismaClient } from '@prisma/client';
import { UserService } from './user.service';

describe('UserService', () => {
  let subject: UserService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DbModule, CommonModule],
      providers: [UserService],
    }).compile();

    subject = moduleRef.get(UserService);
    prisma = moduleRef.get(PrismaService);

    setupCleanupDatabase(prisma);
  });

  afterEach(async () => {
    await cleanupDatabase(prisma);
  });

  it('findById は対象ユーザーを返す', async () => {
    await setupFixtures(prisma, () => {
      user({ id: 'u1' });
      user({ id: 'u2' });
    });

    const user1 = await subject.findById('u1');
    expect(user1?.id).toStrictEqual('u1');
  });

  it('createUser', async () => {
    const user1 = await subject.createUser({
      name: 'name 1',
    });

    const dbUser1 = await prisma.user.findFirstOrThrow({
      where: { id: user1.id },
    });
    expect(dbUser1.name).toStrictEqual('name 1');
  });
});

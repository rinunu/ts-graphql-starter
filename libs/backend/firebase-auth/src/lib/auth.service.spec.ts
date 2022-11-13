import { Test } from '@nestjs/testing';
import { DbModule, PrismaService } from '@backend/db';
import { CommonModule } from '@backend/common';

import {
  cleanupDatabase,
  setupCleanupDatabase,
  setupFixtures,
} from 'prisma-test-fixture';
import { PrismaClient } from '@prisma/client';
import { AuthService } from './auth.service';
import { UserModule, UserService } from '@backend/user';
import { firebaseUser } from './test-util/firebaseUser';

describe('AuthService', () => {
  let subject: AuthService;
  let userService: UserService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DbModule, CommonModule, UserModule],
      providers: [AuthService],
    }).compile();

    subject = moduleRef.get(AuthService);
    prisma = moduleRef.get(PrismaService);
    userService = moduleRef.get(UserService);

    setupCleanupDatabase(prisma);
  });

  afterEach(async () => {
    await cleanupDatabase(prisma);
    jest.restoreAllMocks();
  });

  it('setupUser はユーザーが存在しない場合、作成し、 firebase との紐付けを保存する', async () => {
    jest.spyOn(userService, 'findById').mockResolvedValue(null);
    jest.spyOn(userService, 'createUser').mockResolvedValue({
      id: 'new-user',
      name: 'name 1',
      createdAt: new Date(),
    });

    const newUser = await subject.setupUser({
      firebaseUserId: 'fb-1',
      initialName: 'name 1',
    });

    expect(newUser.id).toStrictEqual('new-user');

    const dbFbUser1 = await prisma.firebaseUser.findFirstOrThrow({
      where: { firebaseUserId: 'fb-1' },
    });
    expect(dbFbUser1).toStrictEqual(
      expect.objectContaining({
        firebaseUserId: 'fb-1',
        userId: 'new-user',
      })
    );
  });

  it('setupUser はユーザーが存在する場合、それを使用する', async () => {
    await setupFixtures(prisma, () => {
      firebaseUser({ userId: 'exists-user', firebaseUserId: 'fb-1' });
    });
    jest.spyOn(userService, 'findById').mockResolvedValue({
      id: 'exists-user',
      name: 'name 1',
      createdAt: new Date(),
    });
    jest.spyOn(userService, 'createUser').mockRejectedValue(new Error('error'));

    const existsUser = await subject.setupUser({
      firebaseUserId: 'fb-1',
      initialName: 'name 1',
    });

    expect(existsUser.id).toStrictEqual('exists-user');
  });
});

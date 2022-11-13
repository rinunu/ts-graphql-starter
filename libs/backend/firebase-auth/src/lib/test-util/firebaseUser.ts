import { Prisma } from '.prisma/client';
import { addFixture, date } from 'prisma-test-fixture';

type FirebaseUserCreateManyInput = Prisma.FirebaseUserCreateManyInput;

export function firebaseUser(
  a: Partial<FirebaseUserCreateManyInput> &
    Pick<FirebaseUserCreateManyInput, 'firebaseUserId' | 'userId'>
) {
  addFixture(({ prisma }) => ({
    table: prisma.firebaseUser,
    data: {
      userId: a.userId,
      firebaseUserId: a.firebaseUserId,
      createdAt: date(a.createdAt) ?? new Date(),
    } as FirebaseUserCreateManyInput,
  }));
}

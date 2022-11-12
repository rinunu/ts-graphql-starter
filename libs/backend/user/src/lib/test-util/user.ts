import { Prisma } from '.prisma/client';
import { addFixture, date, makeId } from 'prisma-test-fixture';

type UserCreateManyInput = Prisma.UserCreateManyInput;

export function user(a: Partial<UserCreateManyInput>) {
  const id = a.id ?? makeId('u');
  addFixture(({ prisma }) => ({
    table: prisma.user,
    data: {
      id,
      name: a.name ?? 'name-' + id,
      updatedAt: date(a.updatedAt) ?? new Date(),
      createdAt: date(a.createdAt) ?? new Date(),
    } as UserCreateManyInput,
  }));
}

import { Prisma } from '.prisma/client';
import { addFixture, date, makeId } from 'prisma-test-fixture';

type PostCreateManyInput = Prisma.PostCreateManyInput;

export function post(a: Partial<PostCreateManyInput>) {
  const id = a.id ?? makeId('p');
  addFixture(({ prisma }) => ({
    table: prisma.post,
    data: {
      id,
      authorId: a.authorId ?? makeId('u'),
      content: a.content ?? 'content-' + id,
      createdAt: date(a.createdAt) ?? new Date(),
    } as PostCreateManyInput,
  }));
}

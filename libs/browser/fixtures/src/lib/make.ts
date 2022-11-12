import { DeepPartial } from 'ts-essentials';
import { Post, User } from '@shared/graphql-codegen';

/* eslint @typescript-eslint/no-var-requires: "off" */
const merge = require('deepmerge');

export function makeId(type: Type) {
  // 明示的な ID とかぶらないように
  const nextId = nextIds.get(type) ?? 9999;
  nextIds.set(type, nextId + 1);
  return `${nextId}`;
}

export function makeUser(a?: DeepPartial<User>): User {
  return mergeIfNeeded(
    {
      __typename: 'User',
      id: makeId('User'),
      name: '名前',
      posts: [],
      createdAt: '2020-01-01T00:00:00.000Z',
    },
    a
  );
}

export function makePost(a?: DeepPartial<Post>): Post {
  return mergeIfNeeded(
    {
      __typename: 'Post',
      id: makeId('Post'),
      author: makeUser(),
      content: 'タイトル '.repeat(3),
      createdAt: '2020-01-01T00:00:00.000Z',
    },
    a
  );
}

type Type = 'User' | 'Post';
const nextIds = new Map<Type, number>();

const overwriteMerge = (destinationArray: unknown, sourceArray: unknown) =>
  sourceArray;

function mergeIfNeeded<T>(x: T, y: unknown): T {
  if (!y) {
    return x;
  }
  return merge(x, y, {
    arrayMerge: overwriteMerge,
  });
}

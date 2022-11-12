import { AsyncLocalStorage } from 'async_hooks';
import { PrismaClient } from '@prisma/client';
import { groupBy } from './group-by';
import invariant from 'invariant';

const asyncLocalStorage = new AsyncLocalStorage();

interface Fixture {
  table: unknown;
  data: object;
}

interface Store {
  prisma: PrismaClient;
  fixtures: Fixture[];
}

export async function setupFixtures(prisma: PrismaClient, f: () => void) {
  const fixtures: Fixture[] = [];
  asyncLocalStorage.run({ prisma, fixtures }, f);
  const tableToFixtures = groupBy(fixtures, (a) => a.table);

  return await Promise.all(
    tableToFixtures.map(([table, fixtures]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (table as any).createMany({
        data: fixtures.map((it) => it.data),
      });
    })
  );
}

interface Context {
  prisma: PrismaClient;
}

export function addFixture(f: (context: Context) => Fixture) {
  const store = asyncLocalStorage.getStore() as Store | undefined;
  checkContext(store);
  store.fixtures.push(f({ prisma: store.prisma }));
}

function checkContext(store: Store | undefined): asserts store is Store {
  invariant(store, 'prisma-test-fixture: called outside of setupFixtures()');
}

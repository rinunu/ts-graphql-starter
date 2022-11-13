import { Prisma, PrismaClient } from '@prisma/client';
import PrismaAction = Prisma.PrismaAction;
import { unique } from './unique';
import { uncapitalize } from './uncapitalize';

const touchedModels: string[] = [];

export function setupCleanupDatabase(prisma: PrismaClient) {
  console.log('prisma-test-fixture: setup');
  prisma.$use(async (params, next) => {
    params.model;
    const targetActions: PrismaAction[] = [
      'create',
      'createMany',
      'update',
      'updateMany',
      'upsert',
    ];
    if (targetActions.indexOf(params.action) === -1) {
      return next(params);
    }

    if (params.model) {
      touchedModels.push(params.model);
    }

    return next(params);
  });
}

/**
 * $executeRaw には対応していない
 */
export async function cleanupDatabase(prisma: PrismaClient) {
  const touchedModels2 = unique(touchedModels).map((it) => uncapitalize(it));

  return await Promise.all(
    touchedModels2.map((model) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (prisma as any)[model].deleteMany()
    )
  );
}

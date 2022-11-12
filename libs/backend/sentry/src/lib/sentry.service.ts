import {
  ConsoleLogger,
  Injectable,
  OnApplicationShutdown,
} from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { NodeOptions } from '@sentry/node';
import { SentryUser } from './sentry-user';

@Injectable()
export class SentryService
  extends ConsoleLogger
  implements OnApplicationShutdown
{
  constructor(options: NodeOptions) {
    super();
    Sentry.init(options);
  }

  setUser(user: SentryUser) {
    Sentry.setUser(user);
  }

  async onApplicationShutdown() {
    await Sentry.close();
  }
}

import { DynamicModule, Global, Module } from '@nestjs/common';
import { SentryService } from './sentry.service';
import { NodeOptions } from '@sentry/node';

@Global()
@Module({})
export class SentryModule {
  public static forRoot(options: NodeOptions): DynamicModule {
    const sentryService = {
      provide: SentryService,
      useValue: new SentryService(options),
    };

    return {
      module: SentryModule,
      providers: [sentryService],
      exports: [SentryService],
    };
  }
}

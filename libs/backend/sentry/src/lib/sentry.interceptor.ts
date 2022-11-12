import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import * as Sentry from '@sentry/node';
import { Scope } from '@sentry/node';
import type { GqlContextType } from '@nestjs/graphql';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      tap({
        error: (exception) => {
          Sentry.withScope((scope) => {
            return this.captureException(context, scope, exception);
          });
        },
      })
    );
  }

  protected captureException(
    context: ExecutionContext,
    scope: Scope,
    exception: HttpException
  ) {
    switch (context.getType<GqlContextType>()) {
      case 'http':
        return this.captureHttpException(exception);
      case 'graphql':
        return this.captureGraphQlException(
          GqlExecutionContext.create(context),
          exception
        );
    }
  }

  private captureHttpException(exception: HttpException): void {
    Sentry.captureException(exception);
  }

  private captureGraphQlException(
    gqlContext: GqlExecutionContext,
    exception: unknown
  ): void {
    const info = gqlContext.getInfo();

    Sentry.setContext('GraphQL', {
      parent_type: info.parentType.name,
      field: info.fieldName,
    });

    Sentry.captureException(exception);
  }
}

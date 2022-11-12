import { Query, Resolver } from '@nestjs/graphql';

import { GqlUser } from './gql-user';
import { UseGuards } from '@nestjs/common';
import { User } from '@backend/user';
import { CurrentUser, GqlAuthGuard } from '@backend/firebase-auth';

@Resolver(() => GqlUser)
@UseGuards(GqlAuthGuard)
export class MyResolver {
  @Query(() => GqlUser)
  async me(@CurrentUser() me: User): Promise<GqlUser> {
    return new GqlUser(me);
  }
}

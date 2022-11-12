import {
  Args,
  Field,
  ID,
  InputType,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlPost } from './gql-post';

import { GqlUser } from './gql-user';
import { PaginationArgs } from './pagenation.args';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { User, UserService } from '@backend/user';
import { PostService } from '@backend/sample';
import { CurrentUser, GqlAuthGuard } from '@backend/firebase-auth';

@InputType()
export class CreateDummyUserInput {
  @Field()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

@Resolver(() => GqlUser)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  @Mutation(() => GqlUser)
  async createDummyUser(@Args('input') input: CreateDummyUserInput) {
    return await this.userService.createDummyUser({
      name: input.name,
    });
  }

  @Query(() => GqlUser)
  async user(@Args('id', { type: () => ID }) id: string): Promise<GqlUser> {
    const a = await this.userService.findById(id);
    if (!a) {
      throw new NotFoundException(id);
    }
    return a;
  }

  @Query(() => [GqlUser])
  @UseGuards(GqlAuthGuard)
  async users(@Args() args: PaginationArgs, @CurrentUser() user: User) {
    return this.userService.findUsers(args);
  }

  @ResolveField(() => [GqlPost])
  async posts(
    @Parent() user: GqlUser,
    @Args() args: PaginationArgs
  ): Promise<GqlPost[]> {
    return (await this.postService.findByUser(user.id, args)).map(
      (it) => new GqlPost(it)
    );
  }
}

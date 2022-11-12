import {
  Args,
  Field,
  InputType,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  ID,
} from '@nestjs/graphql';
import { GqlPost } from './gql-post';
import { GqlUser } from './gql-user';
import { PaginationArgs } from './pagenation.args';
import { User, UserService } from '@backend/user';
import { PostService } from '@backend/sample';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@backend/firebase-auth';
import { CurrentUser } from '@backend/firebase-auth';

@InputType()
export class AddPostInput {
  @Field()
  content!: string;
}

@Resolver(() => GqlPost)
@UseGuards(GqlAuthGuard)
export class PostsResolver {
  constructor(
    private userService: UserService,
    private postService: PostService
  ) {}

  @Query(() => [GqlPost])
  async posts(@Args() args: PaginationArgs): Promise<GqlPost[]> {
    return (await this.postService.findAll(args)).map((it) => new GqlPost(it));
  }

  @Mutation(() => GqlPost)
  async addPost(
    @CurrentUser() me: User,
    @Args('input') input: AddPostInput
  ): Promise<GqlPost> {
    return new GqlPost(await this.postService.post(me.id, input));
  }

  @ResolveField(() => GqlUser)
  async author(@Parent() post: GqlPost): Promise<User | null> {
    return this.userService.findById(post.impl.authorId);
  }
}

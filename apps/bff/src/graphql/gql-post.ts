import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from '@backend/sample';

@ObjectType('Post', { description: 'post.' })
export class GqlPost {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field()
  createdAt: Date;

  constructor(public impl: Post) {
    this.id = impl.id;
    this.content = impl.content;
    this.createdAt = impl.createdAt;
  }
}

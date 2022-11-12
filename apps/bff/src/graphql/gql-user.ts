import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '@backend/user';

@ObjectType('User', { description: 'user.' })
export class GqlUser {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  constructor(a: User) {
    this.id = a.id;
    this.name = a.name;
    this.createdAt = a.createdAt;
  }
}

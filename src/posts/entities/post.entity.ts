import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => ID)
  id!: string;
  @Field(() => String)
  title!: string;
  content?: string;
  published!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

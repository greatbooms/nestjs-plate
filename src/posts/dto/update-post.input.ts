import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @Field()
  @IsNotEmpty()
  id!: string;

  @Field()
  @IsNotEmpty()
  content!: string;

  @Field()
  @IsNotEmpty()
  title!: string;
}

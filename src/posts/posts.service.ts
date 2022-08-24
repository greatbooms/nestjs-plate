import { Injectable } from '@nestjs/common';
import type { CreatePostInput } from './dto/create-post.input';
import type { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostInput: CreatePostInput) {
    console.log(createPostInput);
    const newPost = this.prisma.post.create({
      data: {
        published: true,
        title: createPostInput.title,
        content: createPostInput.content,
      },
    });
    return newPost;
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findOne(id: string) {
    return this.prisma.post.findUnique({ where: { id: id } });
  }

  update(id: string, updatePostInput: UpdatePostInput) {
    console.log(updatePostInput);
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

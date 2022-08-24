import { Injectable } from '@nestjs/common';
import type { CreateUserDto } from './dto/create-user.dto';
import type { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: createUserDto.password,
        firstname: createUserDto.firstname,
        lastname: createUserDto.lastname,
        role: 'ADMIN',
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
      where: {
        email: updateUserDto.email,
      },
      data: {
        id: id,
      },
    });
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}

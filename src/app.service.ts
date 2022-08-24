import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  async getHello(): Promise<string> {
    const result = await this.prisma.user.findUnique({
      where: {
        id: '1',
      },
    });
    console.log(result);
    return '';
  }
}

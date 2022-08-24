import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard)
  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

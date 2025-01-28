import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isValidObjectId } from 'mongoose';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const existAccount = await this.userService.findByEmail(createUserDto.email)
    if (existAccount) {
      throw new BadRequestException(`User with email ${createUserDto.email} already exist`)
    }
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid ID format")
    }
    const existUser = await this.userService.findOne(id)
    if (!existUser) {
      throw new NotFoundException("User not found")
    }
    return existUser
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid ID format")
    }
    const existUser = await this.userService.findOne(id)
    if (!existUser) {
      throw new NotFoundException("User not found")
    }
    return this.userService.update(id, updateUserDto);
  }

  @Patch('softDelete/:id')
  async softDelete(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid ID format")
    }
    const existUser = await this.userService.findOne(id)
    if (!existUser) {
      throw new NotFoundException("User not found")
    }
    return this.userService.softDelete(id);
  }
  
  @Patch('restore/:id')
  async restore(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid ID format")
    }
    const existUser = await this.userService.findOne(id)
    if (!existUser) {
      throw new NotFoundException("User not found")
    }
    return this.userService.restore(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException("Invalid ID format")
    }
    const existUser = await this.userService.findOne(id)
    if (!existUser) {
      throw new NotFoundException("User not found")
    }
    return this.userService.remove(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { LibService } from 'src/lib/lib.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private libService: LibService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const np: string = this.libService.generateNp(createUserDto.birthDate)
    const password: string = this.libService.hash(np)
    createUserDto['np'] = np;
    createUserDto['password'] = password

    const newUser = await this.userModel.create(createUserDto)
    return newUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({email: email}).exec()
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec()
    return updatedUser;
  }

  async softDelete(id: string) {
    await this.userModel.findByIdAndUpdate(id, { deletedAt: new Date() })
    return 'User data has been soft deleted'
  }

  async restore(id: string) {
    await this.userModel.findByIdAndUpdate(id, { deletedAt: null })
    return 'User data has been restored'
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id)
    return 'Deleted user success';
  }
}

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LibService } from 'src/lib/lib.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly libService: LibService
    ) {}

    async login(data: string) {
        const decrypted: {np: string; password: string} = JSON.parse(this.libService.decryption(data))
        const user = await this.userModel.findOne({np: decrypted.np})
        if (!user) {
            throw new NotFoundException("User not found")
        }
        if(!this.libService.verifyhash(decrypted.password, user.password)){
            throw new BadRequestException("Wrong Password")
        };
        
        return user
    }
}

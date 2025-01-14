import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LibModule } from 'src/lib/lib.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    LibModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}

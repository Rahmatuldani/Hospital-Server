import { Module } from '@nestjs/common';
import { LibService } from './lib.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [LibService],
  exports: [LibService]
})
export class LibModule {}

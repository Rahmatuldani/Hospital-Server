import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { UserModule } from './user/user.module';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { LibModule } from './lib/lib.module';
import { LibService } from './lib/lib.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("mongoUri"),
        dbName: configService.get<string>("dbName"),
      })
    }),
    FilesModule,
    UserModule,
    LibModule
  ],
  controllers: [AppController],
  providers: [AppService, LibService],
})
export class AppModule {}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AppDto1, AppDto2 } from './app.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('encryption')
  encryption(@Body() body: AppDto2) {
    return this.appService.encryption(body)
  }
  
  @Post('decryption')
  decryption(@Body() body: AppDto1) {
    return this.appService.decryption(body)
  }
}

import { Injectable } from '@nestjs/common';
import { LibService } from './lib/lib.service';
import { AppDto1, AppDto2 } from './app.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly libService: LibService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  encryption(body: AppDto2) {
    const data = JSON.stringify({
      np: body.np,
      password: body.password
    })
    return this.libService.encryption(data)
  }

  decryption(body: AppDto1) {
    const data = this.libService.decryption(body.data)
    return JSON.parse(data)
  }
}

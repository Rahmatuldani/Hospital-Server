import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';

@Controller('')
@ApiTags('Auth')
export class AuthController {
    constructor (
        private readonly authService: AuthService
    ) {}

    @Post("login")
    login(@Body() body: AuthDto) {
        return this.authService.login(body.data)
    }
}

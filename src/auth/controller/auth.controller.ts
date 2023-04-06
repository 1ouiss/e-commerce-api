import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { UserCreateDto } from 'src/user/dto/user-create.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: UserLoginDto): Promise<any> {
    console.log('data', data);

    return await this.authService.login(data);
  }

  @Post('register')
  async register(@Body() data: UserCreateDto): Promise<any> {
    console.log('data', data);

    return await this.authService.register(data);
  }
}

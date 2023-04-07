import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { UserCreateDto } from 'src/user/dto/user-create.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserLoginDto): Promise<any> {
    const userDb = await this.userService.getOneUserByEmail(user.email);

    if (!userDb) {
      return {
        message: 'User not found',
      };
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userDb.password,
    );

    if (!isPasswordValid) {
      return {
        message: 'Password is not valid',
      };
    }

    const payload = {
      email: userDb.email,
      id: userDb.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: any): Promise<any> {
    return await this.userService.getOneUserByEmail(payload.email);
  }

  async register(user: UserCreateDto): Promise<any> {
    const userDb = await this.userService.getOneUserByEmail(user.email);

    if (userDb) {
      return {
        message: 'User already exists',
      };
    }
    const newUser = await this.userService.createUser(user);

    return newUser;
  }
}

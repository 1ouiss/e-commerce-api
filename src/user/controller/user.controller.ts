import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  SerializeOptions,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { User } from '../entity/user.entity';

@SerializeOptions({
  strategy: 'excludeAll',
  groups: ['user'],
})
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService, // private readonly authService: AuthService,
  ) {}

  // @Post('login')
  // async login(@Body() data: UserLoginDto): Promise<User> {
  //   return await this.authService.validateUser(data);
  // }

  @Post()
  createUser(@Body() data: UserCreateDto): Promise<User> {
    return this.userService.createUser(data);
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getOneUserById(id);
  }
}

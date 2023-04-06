import { IsEmail, MinLength } from 'class-validator';

export class UserCreateDto {
  @MinLength(3, {
    message: 'Username is too short',
  })
  username: string;
  @MinLength(3, {
    message: 'Password is too short',
  })
  password: string;
  @IsEmail()
  email: string;
  @MinLength(3, {
    message: 'Address is too short',
  })
  address: string;
}

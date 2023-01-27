import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';
import { ExistingUserDTO } from 'src/user/dtos/existing-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByEmail(email);
    const doesUserExist = !!user;

    if (!doesUserExist) {
      throw new Error('User does not exist');
    }

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) {
      throw new Error('password does not match');
    }

    return this.userService._getUserDetails(user);
  }

  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
    const { name, email, password } = user;
    try {
      const existingUser = await this.userService.findByEmail(email);

      if (existingUser) {
        throw new Error('User already exist, try to connect with this email');
      }

      const hashedPassword = await this.hashPassword(password);
      const newUser = await this.userService.create(
        name,
        email,
        hashedPassword,
      );

      return this.userService._getUserDetails(newUser);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(
    existingUser: ExistingUserDTO,
  ): Promise<{ token: string } | Error> {
    const { email, password } = existingUser;
    try {
      const user = await this.validateUser(email, password);
      const jwt = await this.jwtService.signAsync({ user });

      return { token: jwt };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

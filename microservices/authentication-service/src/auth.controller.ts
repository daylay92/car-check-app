import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDetails,
  LoginResponse,
  SignupDetails,
  TokenData,
  DecodedResponse,
} from '../../../proto/build/auth';
import { GrpcMethod, RpcException } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  @GrpcMethod('AuthService', 'Login')
  async login(data: LoginDetails): Promise<LoginResponse> {
    const {
      id,
      email,
      firstName,
      lastName,
      isAdmin,
      createdAt
    } = await this.authService.validateUser(data.email, data.password);
    const token = this.authService.generateToken({ id, email, isAdmin });
    return {
      id,
      email,
      firstName,
      lastName,
      isAdmin,
      token,
      createdAt
    };
  }


  @GrpcMethod('AuthService', 'Signup')
  async signup(data: SignupDetails): Promise<LoginResponse> {
    const isUserExist = await this.authService.verifyUserExist(data.email);
    if(isUserExist.isExist) throw new RpcException('Email already Exist');
    const hash = this.authService.hashPassword(data.password);
    const user = await this.authService.register({ ...data, hash });
    const token = this.authService.generateToken({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    return { ...user, token };
  }

  @GrpcMethod('AuthService', 'Authenticate')
  getDecoded({ token }: TokenData): DecodedResponse {
    return this.authService.verifyToken(token);
  }
}

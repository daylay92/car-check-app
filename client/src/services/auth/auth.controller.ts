import {
  Controller,
  OnModuleInit,
  Inject,
  Post,
  Body,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { WalletProviderService } from '../wallet/wallet.service';
import {
  AuthService,
  SignupDetails,
  LoginResponse,
  LoginDetails,
} from '../../../../proto/build/auth';
import { ClientGrpc } from '@nestjs/microservices';
import { promisify } from '../../utils';
import { SignupResponse } from './interfaces/signup.response';

@Controller('api/v1/auth')
export class AuthController implements OnModuleInit {
  private authService: AuthService;
  @Inject(WalletProviderService)
  private walletService: WalletProviderService;
  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}
  onModuleInit(): void {
    this.authService = promisify(
      this.client.getService<AuthService>('AuthService'),
    );
  }
  @HttpCode(201)
  @Post('signup')
  async signup(@Body() data: SignupDetails): Promise<SignupResponse> {
    try {
      const user = await this.authService.Signup(data);
      const { id, balance } = await this.walletService.createWallet(user.id);
      return { ...user, walletId: id, balance };
    } catch (e) {
      const regex = /Exist/i;
      throw new HttpException(e.details, regex.test(e.details) ? 409 : 500);
    }
  }
  @HttpCode(200)
  @Post('login')
  async login(@Body() data: LoginDetails): Promise<LoginResponse> {
    try{
      const user = await this.authService.Login(data);
    return user;
    } catch (e) {
      const regex = /Invalid/i;
      throw new HttpException(e.details, regex.test(e.details) ? 400 : 500);
    }
    
  }
}

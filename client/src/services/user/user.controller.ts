import {
  Controller,
  OnModuleInit,
  Inject,
  Get,
  HttpException,
  HttpCode,
  Param,
  Patch,
  Body,
} from '@nestjs/common';
import { WalletAmountDto } from './dto/amount.dto';
import { WalletProviderService } from '../wallet/wallet.service';
import { UserService } from '../../../../proto/build/user';
import { WalletDetails, TransactDetails } from '../../../../proto/build/wallet';
import { ClientGrpc } from '@nestjs/microservices';
import { UserData } from './interfaces/user.interface'
import { promisify } from '../../utils';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User Service')
@Controller('api/v1/users')
export class UserController implements OnModuleInit {
  private userService: UserService;

  @Inject(WalletProviderService)
  private walletService: WalletProviderService;

  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}
  onModuleInit(): void {
    this.userService = promisify(
      this.client.getService<UserService>('UserService'),
    );
  }
  @HttpCode(200)
  @Get(':userId')
  @ApiOkResponse({ description: 'Successfully retrieved user.' })
  @ApiInternalServerErrorResponse({
    description: 'An occurred while processing the request',
  })
  @ApiBadRequestResponse({ description: 'User ID is invalid or does not exist of any user.' })
  async getUser(@Param('userId') userId: string): Promise<UserData> {
    try {
      const res = await this.userService.FindUser({id: userId});
      delete res.hash;
      return res;
    } catch (e) {
      const regex = /User/i;
      throw new HttpException(e.details, regex.test(e.details) ? 400 : 500);
    }
  }

  @ApiOkResponse({ description: 'Successfully retrieved wallet balance.' })
  @ApiInternalServerErrorResponse({
    description: 'An occurred while processing the request',
  })
  @ApiBadRequestResponse({ description: 'User ID is invalid or User wallet cannot be found.' })
  @HttpCode(200)
  @Get(':userId/wallet')
  async getBalance(@Param('userId') userId: string): Promise<WalletDetails> {
    try {
      const res = await this.walletService.fetchBalance(userId);
      return res;
    } catch (e) {
      const regex = /wallet/i;
      throw new HttpException(e.details, regex.test(e.details) ? 400 : 500);
    }
  }

  @HttpCode(200)
  @Patch(':userId/wallet')
  @ApiOkResponse({ description: 'Successfully topup user wallet.' })
  @ApiInternalServerErrorResponse({
    description: 'An occurred while processing the request',
  })
  @ApiBadRequestResponse({ description: 'User ID is invalid or User wallet cannot be found.' })
  async topWallet(
    @Param('userId') userId: string,
    @Body() { amount }: WalletAmountDto,
  ): Promise<TransactDetails> {
    try {
      const res = await this.walletService.topupWallet(userId, amount);
      return res;
    } catch (e) {
      const regex = /wallet/i;
      throw new HttpException(e.details, regex.test(e.details) ? 400 : 500);
    }
  }
}

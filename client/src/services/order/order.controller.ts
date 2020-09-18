import {
  Controller,
  OnModuleInit,
  Inject,
  Post,
  Body,
  Get,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import {
  OrderService,
  NewOrder,
  OrderList,
} from '../../../../proto/build/order';
import { ClientGrpc } from '@nestjs/microservices';
import { promisify } from '../../utils';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create.order';

@ApiTags('Car Service')
@Controller('api/v1/orders')
export class OrderController implements OnModuleInit {
  private orderService: OrderService;
  constructor(@Inject('ORDER_PACKAGE') private client: ClientGrpc) {}
  onModuleInit(): void {
    this.orderService = promisify(
      this.client.getService<OrderService>('OrderService'),
    );
  }
  @HttpCode(201)
  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'A new order has been successfully created.',
  })
  @ApiBadRequestResponse({description: 'User does not have enough funds to completed the order.'})
  @ApiInternalServerErrorResponse({
    description: 'An occurred while processing the request',
  })
  async create(@Body() data: CreateOrderDto): Promise<NewOrder> {
    try {
      const order = await this.orderService.Create(data);
      return order;
    } catch (e) {
      const regex = /funds/i;
      throw new HttpException(e.details, regex.test(e.details) ? 400 : 500);
    }
  }

  @HttpCode(200)
  @Get()
  @ApiOkResponse({ description: 'Successfully Retrieved orders' })
  @ApiInternalServerErrorResponse({
    description: 'An occurred while processing the request',
  })
  async fetchAll(): Promise<OrderList> {
    try {
      const orders = await this.orderService.FetchAllOrder({});
      return orders;
    } catch (e) {
      throw new HttpException(e.details, 500);
    }
  }
}

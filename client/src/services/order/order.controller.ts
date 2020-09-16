import {
    Controller,
    OnModuleInit,
    Inject,
    Post,
    Body,
    Get,
    HttpException,
    HttpCode
  } from '@nestjs/common';
  import {
    OrderService, OrderData, NewOrder, OrderList
  } from '../../../../proto/build/order';
  import { ClientGrpc } from '@nestjs/microservices';
  import { promisify } from '../../utils';
  
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
    async create(@Body() data: OrderData): Promise<NewOrder> {
      try {
        const order = await this.orderService.Create(data);
        return order;
      } catch (e) {
          const regex = /funds/i
        throw new HttpException(e.details, regex.test(e.details)? 400: 500);
      }
    }

    @HttpCode(200)
    @Get()
    async fetchAll(): Promise<OrderList> {
      try {
        const orders = await this.orderService.FetchAllOrder({});
        return orders;
      } catch (e) {
        throw new HttpException(e.details, 500);
      }
    }
  }
  
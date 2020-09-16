/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Controller, Inject } from '@nestjs/common';
import { OrderService } from './order.service';
import { ClientGrpc, RpcException, GrpcMethod } from '@nestjs/microservices';
import { promisify } from './utils';
import { CarService } from '../../../proto/build/car';
import { WalletService } from '../../../proto/build/wallet';
import { UserService } from '../../../proto/build/user';
import { NewOrder, OrderData, OrderList } from '../../../proto/build/order';
import { Empty } from '../../../proto/build/google/protobuf/empty';
import { Metadata } from 'grpc';

@Controller()
export class OrderController {
  private carService: CarService;
  private walletService: WalletService;
  private userService: UserService;
  @Inject(OrderService)
  private orderService: OrderService;
  constructor(
    @Inject('CAR_PACKAGE') private carClient: ClientGrpc,
    @Inject('WALLET_PACKAGE') private walletClient: ClientGrpc,
    @Inject('USER_PACKAGE') private userClient: ClientGrpc,
  ) {}
  onModuleInit(): void {
    this.carService = promisify(
      this.carClient.getService<CarService>('CarService'),
    );
    this.walletService = promisify(
      this.walletClient.getService<WalletService>('WalletService'),
    );
    this.userService = promisify(
      this.userClient.getService<UserService>('UserService'),
    );
  }
  @GrpcMethod('OrderService', 'Create')
  async create(
    { userId, carId, total }: OrderData,
    _metadata: Metadata,
  ): Promise<NewOrder> {
    try {
      const { carModel, price, make, vin } = await this.carService.FindCar({
        id: carId,
      });
      const { balance } = await this.walletService.GetWallet({ userId });
      const totalCost = total * price;
      const newBalance = balance - totalCost;
      if (newBalance < 0)
        throw new RpcException(
          'You do not have the funds to complete your order',
        );
      await this.walletService.DebitWallet({ amount: totalCost, userId });
      const order = await this.orderService.create({
        user: userId,
        car: carId,
        total,
        totalCost,
      });
      const { firstName, lastName } = await this.userService.FindUser({
        id: userId,
      });
      return {
        id: order.id,
        userId,
        firstName,
        lastName,
        carId,
        make,
        vin,
        totalCost,
        carModel,
        total,
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
      };
    } catch (e) {
      throw new RpcException(e.message || 'Error purchasing car');
    }
  }

  @GrpcMethod('OrderService', 'FetchAllOrder')
  async fetchAllOrder(_data: Empty, _metadata: Metadata): Promise<OrderList> {
    try {
      const result = await this.orderService.findAll();
      return result;
    } catch (e) {
      throw new RpcException('Error fetching all orders');
    }
  }
}

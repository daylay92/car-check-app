/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { Order } from './order.schema';
import { Model, model } from 'mongoose';
import { NewDBOrder } from './interfaces/new.order.interface';
import { OrderList } from '../../../proto/build/order';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(data: NewDBOrder): Promise<Order> {
    const order = new this.orderModel(data);
    return order.save();
  }

  async findById(id: string): Promise<Order> {
    return this.orderModel.findById(id);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.find();

    // const orders = orderList.map(order => ({
    //   id: order.id,
    //   //@ts-ignore
    //   userId: String(order.user._id),
    //   //@ts-ignore
    //   firstName: order.user.firstName,
    //   //@ts-ignore
    //   lastName: order.user.lastName,
    //   //@ts-ignore
    //   carId: String(order.car._id),
    //   //@ts-ignore
    //   make: order.car.make,
    //   //@ts-ignore
    //   vin: order.car.vin,
    //   totalCost: order.totalCost,
    //   //@ts-ignore
    //   carModel: order.car.carModel,
    //   //@ts-ignore
    //   total: order.total,
    //   createdAt: order.createdAt.toISOString(),
    //   updatedAt: order.updatedAt.toISOString(),
    // }));
  }
}

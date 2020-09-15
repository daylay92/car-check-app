/* eslint-disable */
import { Empty } from './google/protobuf/empty';


export interface NewOrder {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  carId: string;
  make: string;
  vin: string;
  totalCost: number;
  carModel: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderData {
  userId: string;
  carId: string;
  total: number;
}

export interface OrderList {
  orders: NewOrder[];
}

export interface OrderService {

  Create(request: OrderData): Promise<NewOrder>;

  FetchAllOrder(request: Empty): Promise<OrderList>;

}

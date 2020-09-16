/* eslint-disable */
import { Empty } from './google/protobuf/empty';


export interface NoticeData {
  firstName: string;
  make: string;
  vin: string;
  carModel: string;
  email: string;
}

export interface NotificationService {

  NotifyPurchase(request: NoticeData): Promise<Empty>;
  
}

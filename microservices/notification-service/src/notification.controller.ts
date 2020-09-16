/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Metadata } from 'grpc';
import { NoticeData } from '../../../proto/build/email';
import { GrpcMethod } from '@nestjs/microservices';
import { Empty } from '../../../proto/build/google/protobuf/empty';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @GrpcMethod('NotificationService', 'NotifyPurchase')
  async notifyPurchase(data: NoticeData, _metadata: Metadata): Promise<Empty> {
    await this.notificationService.addNewMail(data);
    return {};
  }
}

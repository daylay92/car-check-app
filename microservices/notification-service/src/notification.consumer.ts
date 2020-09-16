/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  OnQueueRemoved,
  OnQueueStalled,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { sendMail } from './email';

const logger = new Logger('Notification Service Events');

@Processor('email-notification')
export class NotificationConsumer {
  @Process()
  async sendMail(job: Job): Promise<unknown> {
      await sendMail(job.data);
      return {};
  }

  @OnQueueActive()
  onActive(job: Job): void {
    logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueStalled()
  onStalled(job: Job): void {
    logger.log(
      `Job ${job.id} of type ${job.name} with data ${job.data} is stalled`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job, _result: any): void {
    logger.log(`Job ${job.id} of type ${job.name} has successfully completed`);
  }

  @OnQueueFailed()
  onFailed(job: Job, err: Error): void {
    logger.log(
      `Job ${job.id} of type ${job.name} failed with the reason: ${err.message}`,
    );
  }

  @OnQueueRemoved()
  onRemoved(job: Job): void {
    logger.log(
      `Job ${job.id} of type ${job.name} has been successfully removed from queue`,
    );
  }
}

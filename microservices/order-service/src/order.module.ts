import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { ClientsModule } from '@nestjs/microservices';
import { carServiceOptions, walletServiceOptions, userServiceOptions } from './config/grpc.options';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/env';

@Module({
  imports: [
    ClientsModule.register([carServiceOptions, walletServiceOptions, userServiceOptions]),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { Car, CarSchema } from './car.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/env';

@Module({
  imports: [ ConfigModule.forRoot({
    load: [configuration],
  }),
  MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('DATABASE_URL')
    }),
    inject: [ConfigService],
  })
],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { CarService } from './car.service';
import { Metadata } from 'grpc';
import {
  CarData,
  NewCar,
  CarId,
  CarResponse,
  CarUpdateData,
  CarList,
} from '../../../proto/build/car';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Empty } from '../../../proto/build/google/protobuf/empty';

@Controller()
export class CarController {
  constructor(private readonly carService: CarService) {}
  @GrpcMethod('CarService', 'Create')
  async create(data: CarData, _metadata: Metadata): Promise<NewCar> {
    try {
      const {
        id,
        make,
        carModel,
        vin,
        price,
        location,
        features,
        createdAt,
      } = await this.carService.create(data);
      return {
        id,
        make,
        carModel,
        vin,
        price,
        location,
        features,
        createdAt: createdAt.toISOString(),
      };
    } catch (e) {
      throw new RpcException('Error creating Car');
    }
  }

  @GrpcMethod('CarService', 'FetchAll')
  async fetchAll(_data: Empty, _metadata: Metadata): Promise<CarList> {
    try {
      const cars = await this.carService.findAll();
      return {
        cars: cars.map(car => ({
          id: car.id,
          make: car.make,
          carModel: car.carModel,
          vin: car.vin,
          price: car.price,
          location: car.location,
          features: car.features,
          createdAt: car.createdAt.toISOString(),
          updatedAt: car.updatedAt.toISOString(),
        })),
      };
    } catch (e) {
      throw new RpcException('Error fetching cars');
    }
  }

  @GrpcMethod('CarService', 'FindCar')
  async findCar({ id }: CarId, _metadata: Metadata): Promise<CarResponse> {
    try {
      const car = await this.carService.findById(id);
      if (!car)
        throw new RpcException('A Car with the Id provided does not exist');
      return {
        id: car.id,
        make: car.make,
        carModel: car.carModel,
        vin: car.vin,
        price: car.price,
        location: car.location,
        features: car.features,
        createdAt: car.createdAt.toISOString(),
        updatedAt: car.updatedAt.toISOString(),
      };
    } catch (e) {
      throw new RpcException('Error fetching Car');
    }
  }

  @GrpcMethod('CarService', 'UpdateCar')
  async updateCar(
    data: Partial<CarUpdateData>,
    _metadata: Metadata,
  ): Promise<CarResponse> {
    try {
      const { id } = data;
      let car = await this.carService.findById(id);
      if (!car)
        throw new RpcException('A Car with the Id provided does not exist');
      if (data.features) {
        data.features = [...data.features].reduce(
          (prevFeatures, feature) => {
            const potentialFeature = feature.trim();
            if (!prevFeatures.includes(potentialFeature))
              prevFeatures.push(potentialFeature);
            return prevFeatures;
          },
          [...car.features],
        );
      }
      car = await this.carService.updateById(id, data);
      return {
        id: car.id,
        make: car.make,
        carModel: car.carModel,
        vin: car.vin,
        price: car.price,
        location: car.location,
        features: car.features,
        createdAt: car.createdAt.toISOString(),
        updatedAt: car.updatedAt.toISOString(),
      };
    } catch (e) {
      throw new RpcException('Error updating Car');
    }
  }
}

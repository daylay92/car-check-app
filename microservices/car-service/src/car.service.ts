import { Injectable } from '@nestjs/common';
import { Car } from './car.schema';
import { Model } from 'mongoose';
import { CarData, CarUpdateData } from '../../../proto/build/car'
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}
  
  async create(data: CarData): Promise<Car> {
    const car = new this.carModel(data);
    return car.save();
  }

  async findById(id: string): Promise<Car> {
    return this.carModel.findById(id);
  }

  async findAll(): Promise<Car[]> {
    return this.carModel.find();
  }

  async updateById(id: string, data: Partial<CarUpdateData>): Promise<Car> {
    return this.carModel.findOneAndUpdate({
      _id: id
    },
    data,
    {
      new: true,
      runValidators: true,
    }).exec();
  }

}

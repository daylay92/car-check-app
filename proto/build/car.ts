/* eslint-disable */
import { Empty } from './google/protobuf/empty';


export interface CarId {
  id: string;
}

export interface CarResponse {
  id: string;
  make: string;
  carModel: string;
  vin: string;
  price: number;
  location: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CarList {
  cars: CarResponse[];
}

export interface NewCar {
  id: string;
  make: string;
  carModel: string;
  vin: string;
  price: number;
  location: string;
  features: string[];
  createdAt: string;
}

export interface CarData {
  make: string;
  carModel: string;
  vin: string;
  price: number;
  location: string;
  features: string[];
}

export interface CarUpdateData {
  id: string;
  make: string | undefined;
  carModel: string | undefined;
  vin: string | undefined;
  price: number | undefined;
  location: string | undefined;
  features: Array<string | undefined>;
}

export interface CarService {

  Create(request: CarData): Promise<NewCar>;

  FindCar(request: CarId): Promise<CarResponse>;

  FetchAll(request: Empty): Promise<CarList>;

  UpdateCar(request: CarUpdateData): Promise<CarResponse>;

}

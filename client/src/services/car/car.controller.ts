import {
    Controller,
    OnModuleInit,
    Inject,
    Post,
    Body,
    Get,
    Put,
    HttpException,
    HttpCode,Param
  } from '@nestjs/common';
  import {
    CarService, CarData, NewCar, CarList, CarResponse, CarUpdateData
  } from '../../../../proto/build/car';
  import { ClientGrpc } from '@nestjs/microservices';
  import { promisify } from '../../utils';
  
  @Controller('api/v1/cars')
  export class CarController implements OnModuleInit {
    private carService: CarService;
    constructor(@Inject('CAR_PACKAGE') private client: ClientGrpc) {}
    onModuleInit(): void {
      this.carService = promisify(
        this.client.getService<CarService>('CarService'),
      );
    }
    @HttpCode(201)
    @Post()
    async create(@Body() data: CarData): Promise<NewCar> {
      try {
        const car = await this.carService.Create(data);
        return car;
      } catch (e) {
        console.log(e)
        throw new HttpException(e.details, 500);
      }
    }
    @HttpCode(200)
    @Get()
    async fetch(): Promise<CarList> {
      try{
        const cars = await this.carService.FetchAll({});
      return cars;
      } catch (e) {
        throw new HttpException(e.details, 500);
      }
      
    }

    @HttpCode(200)
    @Get(':carId')
    async fetchCar(@Param('carId') id: string): Promise<CarResponse> {
      try{
        const car = await this.carService.FindCar({ id });
      return car;
      } catch (e) {
          const regex = /Exist/i
        throw new HttpException(e.details, regex.test(e.details) ? 400: 500);
      }
      
    }

    @HttpCode(200)
    @Put(':carId')
    async updateCar(@Param('carId') id: string, @Body() data: CarUpdateData): Promise<CarResponse> {
      try{
        const car = await this.carService.UpdateCar({ id, ...data });
      return car;
      } catch (e) {
          const regex = /Exist/i
        throw new HttpException(e.details, regex.test(e.details) ? 400: 500);
      }
      
    }
  }
  
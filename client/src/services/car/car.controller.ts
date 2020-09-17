import {
  Controller,
  OnModuleInit,
  Inject,
  Post,
  Body,
  Get,
  Put,
  HttpException,
  HttpCode,
  Param,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create.car.dto'
import {
  CarService,
  NewCar,
  CarList,
  CarResponse,
  CarUpdateData,
} from '../../../../proto/build/car';
import { ClientGrpc } from '@nestjs/microservices';
import { promisify } from '../../utils';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Car Service')
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
  @ApiCreatedResponse({
    description: 'A new car has been successfully created.',
  })
  @ApiInternalServerErrorResponse({
    description: 'An occurred while processing the request',
  })
  async create(@Body() data: CreateCarDto): Promise<NewCar> {
    try {
      const car = await this.carService.Create(data);
      return car;
    } catch (e) {
      throw new HttpException(e.details, 500);
    }
  }


  @HttpCode(200)
  @Get()
  @ApiOkResponse({ description: 'Successfully Retrieved cars' })
  @ApiInternalServerErrorResponse({
    description: 'An occurred while processing the request',
  })
  async fetch(): Promise<CarList> {
    try {
      const cars = await this.carService.FetchAll({});
      return cars;
    } catch (e) {
      throw new HttpException(e.details, 500);
    }
  }

  @HttpCode(200)
  @Get(':carId')
  @ApiOkResponse({ description: 'Successfully Retrieved car' })
  @ApiInternalServerErrorResponse({
    description: 'An occurred while processing the request',
  })
  @ApiBadRequestResponse({ description: 'Car ID is invalid or does not exist of any car.' })
  async fetchCar(@Param('carId') id: string): Promise<CarResponse> {
    try {
      const car = await this.carService.FindCar({ id });
      return car;
    } catch (e) {
      const regex = /Exist/i;
      throw new HttpException(e.details, regex.test(e.details) ? 400 : 500);
    }
  }

  @HttpCode(200)
  @Put(':carId')
  @ApiOkResponse({ description: 'Successfully updated car' })
  @ApiInternalServerErrorResponse({
    description: 'An occurred while processing the request',
  })
  @ApiBadRequestResponse({ description: 'Car ID is invalid or does not exist of any car.' })
  async updateCar(
    @Param('carId') id: string,
    @Body() data: CarUpdateData,
  ): Promise<CarResponse> {
    try {
      const car = await this.carService.UpdateCar({ id, ...data });
      return car;
    } catch (e) {
      const regex = /Exist/i;
      throw new HttpException(e.details, regex.test(e.details) ? 400 : 500);
    }
  }
}

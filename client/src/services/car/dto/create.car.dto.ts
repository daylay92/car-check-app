import { ApiProperty } from '@nestjs/swagger';
import { featureList } from 'src/assets/features';
import { makes } from '../../../assets/makes';
import { states } from '../../../assets/states';

export class CreateCarDto {
  @ApiProperty({
    required: true,
    description: 'The brand that produces the vehicle.',
    enum: makes,
  })
  make: string;

  @ApiProperty({
    required: true,
    description: 'The model of the vehicle.',
    example: 'Civic'
  })
  carModel: string;

  @ApiProperty({
    required: true,
    example: '7238943jdj09u430jf094j',
    description: 'The vehicle identification number.',
  })
  vin: string;

  @ApiProperty({
    required: true,
    example: 3000000,
    description: 'The selling price of the vehicle.',
  })
  price: number;

  @ApiProperty({
    required: true,
    description: 'The current location of the vehicle.',
    enum: states,
  })
  location: string;

  @ApiProperty({
    type: [String],
    description: 'A selected list options that best describes of the vehicle.',
    enum: featureList,
    isArray: true,
  })
  features: string[];
}

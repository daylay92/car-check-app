import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty({
        description: 'The id of the user creating the order.',
        required: true,
        example:'68398409jd093030'
    })
    userId: string;
    @ApiProperty({
        description: 'The id of the vehicle to be ordered.',
        required: true,
        example:'68398409jd0783493030'
    })
    carId: string;

    @ApiProperty({
        description: 'The total number of the specific car to be ordered.',
        required: true,
        example: 1
    })
    total: number;
}
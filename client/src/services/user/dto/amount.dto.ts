import { ApiProperty } from "@nestjs/swagger";

export class WalletAmountDto{
    @ApiProperty({
        description: 'Amount to credit the user wallet.',
        required: true,
        example: 8000000
    })
    amount: number;
}
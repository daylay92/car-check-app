import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Wallet extends Document {
  @Prop({
    required: true,
    ref: 'User',
    unique: true
  })
  owner: Types.ObjectId;
  @Prop({
    default: 0,
    set: (amount: number): number => parseFloat(amount.toFixed(2)) * 100,
    get: (amount: number): number => parseFloat((amount / 100).toFixed(2)),
  })
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);

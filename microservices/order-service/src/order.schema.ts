import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({
    required: true,
    ref: 'User'
  })
  user: Types.ObjectId;

  @Prop({ required: true, ref: 'Car' })
  car: Types.ObjectId;

  @Prop({
    default: 0,
    required: true,
    set: (amount: number): number => parseFloat(amount.toFixed(2)) * 100,
    get: (amount: number): number => parseFloat((amount / 100).toFixed(2)),
  })
  totalCost: number;

  @Prop({ required: true, default: 1 })
  total: number;

  createdAt: Date;
  updatedAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

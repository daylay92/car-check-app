import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { featureList } from './assets/features';
import { states } from './assets/states';
import { makes } from  './assets/makes';

@Schema({ timestamps: true })
export class Car extends Document {
  @Prop(
    raw([
      {
        type: String,
        required: true,
        enum: featureList,
      },
    ]),
  )
  features: string[];

  @Prop({
    required: true,
    enum: makes,
  })
  make: string;

  @Prop({ required: true })
  carModel: string;

  @Prop({ required: true , enum: states})
  location: string;

  @Prop({ required: true, min:7, max: 30 })
  vin: string;
  @Prop({
    default: 0,
    set: (amount: number): number => parseFloat(amount.toFixed(2)) * 100,
    get: (amount: number): number => parseFloat((amount / 100).toFixed(2)),
  })
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export const CarSchema = SchemaFactory.createForClass(Car);

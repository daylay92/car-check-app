import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({
        required: true, maxLength: 15,
        minLength: 2, lowercase: true
    })
    firstName: string;

    @Prop({
        required: true, maxLength: 15,
        minLength: 2, lowercase: true
    })
    lastName: string;

    @Prop({ required: true, alias: 'username', unique: true, lowercase: true })
    email: string;

    @Prop({ required: true })
    hash: string;

    @Prop({ required: true, default: false })
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
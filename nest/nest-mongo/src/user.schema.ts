import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class User {
  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.String })
  userName: string;

  @Prop()
  password: string;

  @Prop()
  price: number;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ versionKey: false })
export class OrderDoc {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  userId: number;

  //TODO: add orderItem
}

export const OrderDocumentSchema = SchemaFactory.createForClass(OrderDoc);

export type OrderDocument = HydratedDocument<OrderDoc>;
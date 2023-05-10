import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: { // Eliminamos de la respuesta data innecesaria o privada.
    transform(doc, ret, options) {
      delete ret.password;
      delete ret.__v;
    },
  }
})

export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
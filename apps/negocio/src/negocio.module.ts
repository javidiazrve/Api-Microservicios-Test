import { Module } from '@nestjs/common';
import { NegocioController } from './negocio.controller';
import { NegocioService } from './negocio.service';
import { User, UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/api'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [NegocioController],
  providers: [NegocioService],
})
export class NegocioModule {}

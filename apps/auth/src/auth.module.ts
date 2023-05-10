import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    ClientsModule.register([
      { 
        name: 'NEGOCIO_SERVICE', 
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 6379,
        }, 
      },
    ]),
    MongooseModule.forRoot('mongodb://localhost/api'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

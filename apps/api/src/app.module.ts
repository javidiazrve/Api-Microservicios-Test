import { Module } from '@nestjs/common';
import { AuthController } from './Controllers/auth/auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { 
        name: 'AUTH_SERVICE', 
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 6370,
        }, 
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}

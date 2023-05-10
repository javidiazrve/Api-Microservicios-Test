import { NestFactory } from '@nestjs/core';
import { NegocioModule } from './negocio.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NegocioModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 6379,
      },
    },
  );
  await app.listen();
}
bootstrap();

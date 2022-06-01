import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const redisHost = process.env.REDIS_HOST;
  const redisPort = process.env.REDIS_PORT;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        url: `redis://${redisHost ? redisHost : 'redis'}:${
          redisPort ? redisPort : 6379
        }`,
      },
    },
  );
  app.listen().then(() => {
    Logger.log('Microservice listening on port 3000');
  });
}
bootstrap();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const redisHost = process.env.REDIS_HOST;
  const redisPort = process.env.REDIS_PORT;
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.REDIS,
  //     options: {
  //       url: `redis://${redisHost ? redisHost : 'redis'}:${
  //         redisPort ? redisPort : 6379
  //       }`,
  //     },
  //   },
  // );
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: `redis://${redisHost ? redisHost : 'redis'}:${
        redisPort ? redisPort : 6379
      }`,
    },
  });
  await app.startAllMicroservices();
  app.listen(80, '0.0.0.0').then(() => {
    Logger.log('Microservice listening on port 80');
  });
}
bootstrap();

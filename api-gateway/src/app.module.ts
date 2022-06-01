import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'WRITE_USER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisHost = configService.get<string>('REDIS_HOST');
        const redisPort = configService.get<number>('REDIS_PORT');
        return ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: `redis://${redisHost ? redisHost : 'redis'}:${
              redisPort ? redisPort : 6379
            }`,
          },
        });
      },
    },
    {
      provide: 'READ_USER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisHost = configService.get<string>('REDIS_HOST');
        const redisPort = configService.get<number>('REDIS_PORT');
        return ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: `redis://${redisHost ? redisHost : 'redis'}:${
              redisPort ? redisPort : 6379
            }`,
          },
        });
      },
    },
    {
      provide: 'SYNC_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisHost = configService.get<string>('REDIS_HOST');
        const redisPort = configService.get<number>('REDIS_PORT');
        return ClientProxyFactory.create({
          transport: Transport.REDIS,
          options: {
            url: `redis://${redisHost ? redisHost : 'redis'}:${
              redisPort ? redisPort : 6379
            }`,
          },
        });
      },
    },
  ],
})
export class AppModule {}

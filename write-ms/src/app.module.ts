import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    // MongooseModule.forRoot('mongodb://mongodb:27017', {
    //   dbName: 'cqrs',
    // }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const mongoHost = cfg.get<string>('MONGO_HOST');
        const mongoPort = cfg.get<number>('MONGO_PORT');
        const mongoDbName = cfg.get<string>('MONGO_DB_NAME');
        return {
          uri: `mongodb://${mongoHost ? mongoHost : 'mongodb'}:${
            mongoPort ? mongoPort : 27017
          }/${mongoDbName ? mongoDbName : 'cqrs'}`,
        };
      },
    }),
    UserModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

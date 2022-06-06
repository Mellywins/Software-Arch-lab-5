import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport, RedisOptions } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private microservice: MicroserviceHealthIndicator,
    private http: HttpHealthIndicator,
    private cfg: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const redisHost = this.cfg.get<string>('REDIS_HOST');
    const redisPort = this.cfg.get<string>('REDIS_PORT');
    console.log(redisHost, redisPort);
    return this.health.check([
      async () =>
        this.microservice.pingCheck<RedisOptions>('redis', {
          transport: Transport.REDIS,
          options: {
            url: `redis://${redisHost ? redisHost : 'redis'}:${
              redisPort ? redisPort : 6379
            }`,
          },
        }),
    ]);
  }
}

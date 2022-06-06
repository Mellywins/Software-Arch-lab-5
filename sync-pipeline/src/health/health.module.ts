import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  imports: [TerminusModule, ConfigModule, HttpModule],
})
export class HealthModule {}

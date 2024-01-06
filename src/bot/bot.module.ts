import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as process from 'process';
import BotUpdate from 'src/bot/bot.update';

@Module({
  providers: [BotService, BotUpdate],
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      botName: 'RU',
      useFactory: async () => ({
        token: process.env!.BOT_TOKEN_RU,
      }),
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      botName: 'EN',
      useFactory: async () => ({
        token: process.env!.BOT_TOKEN_EN,
      }),
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      botName: 'ES',
      useFactory: async () => ({
        token: process.env!.BOT_TOKEN_ES,
      }),
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      botName: 'PT',
      useFactory: async () => ({
        token: process.env!.BOT_TOKEN_PT,
      }),
    }),
    ClientsModule.register([
      {
        name: 'DATA_BASE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${process.env.RABBIT_MQ_HOST}:5672`],
          queue: process.env.DB_QUEUE,
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  exports: [BotUpdate],
})
export class BotModule {}

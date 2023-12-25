import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import BotUpdate from 'src/bot/bot.update';

@Module({
  providers: [BotService, BotUpdate],
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env!.BOT_TOKEN,
    }),
  ],
  exports: [BotUpdate],
})
export class BotModule {}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import tt from 'typegram';
import {
  CREATE_USER,
  ICreateUserPayload,
  NEW_MESSAGE,
  INewMessagePayload,
} from '@chat-mind-bots/rabbit-patterns';

@Injectable()
export class BotService {
  constructor(@Inject('DATA_BASE_SERVICE') private dbClient: ClientProxy) {
    this.dbClient.connect();
  }

  async registerNewUser(user: tt.User, botLogin: string) {
    const payload: ICreateUserPayload = { telegram: user, botLogin };
    const result = await this.dbClient.emit(CREATE_USER, payload);
    return result;
  }

  async writeNewMessage(
    message: tt.Update.New & tt.Update.NonChannel & tt.Message,
    from: tt.User,
    chat:
      | tt.Chat.ChannelChat
      | tt.Chat.PrivateChat
      | tt.Chat.GroupChat
      | tt.Chat.SupergroupChat,
    botLogin: string,
  ) {
    const payload: INewMessagePayload = { from, chat, message, botLogin };
    const result = await this.dbClient.emit(NEW_MESSAGE, payload);
    return result;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import tt from 'typegram';
import {
  CREATE_USER,
  ICreateUserPayload,
} from '@chat-mind-bots/rabbit-patterns';
import { map, catchError } from 'rxjs';

@Injectable()
export class BotService {
  constructor(@Inject('DATA_BASE_SERVICE') private dbClient: ClientProxy) {
    this.dbClient.connect();
  }

  async registerNewUser(user: tt.User) {
    const payload: ICreateUserPayload = { telegram: user };
    const result = await this.dbClient.emit(CREATE_USER, payload);
    result.pipe(
      map((res) => {
        console.log(res);
      }),
      catchError((err) => {
        console.log(err);
        return [];
      }),
    );
  }
}

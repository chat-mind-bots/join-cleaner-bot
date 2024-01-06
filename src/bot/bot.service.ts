import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import tt from 'typegram';
import { map, catchError } from 'rxjs';

@Injectable()
export class BotService {
  constructor(@Inject('DATA_BASE_SERVICE') private dbClient: ClientProxy) {
    this.dbClient.connect();
  }

  async registerNewUser(user: tt.User) {
    // console.log(this.dbClient);
    const result = await this.dbClient.emit('CREATE_USER', { telegram: user });
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

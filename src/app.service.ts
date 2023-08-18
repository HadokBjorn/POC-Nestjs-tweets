import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDTO } from './dtos/users.dto';
import { Tweet } from './entities/tweets.entity';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHello(): string {
    return 'Hello World!';
  }

  async createUser(body: CreateUserDTO) {
    const { username, avatar } = body;
    this.users.push(new User(username, avatar));
    throw new HttpException('ok', HttpStatus.OK);
  }
}

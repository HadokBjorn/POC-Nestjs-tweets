import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/users.entity';
import { CreateUserDTO } from './dtos/users.dto';
import { Tweet } from './entities/tweets.entity';
import { CreateTweetDTO } from './dtos/tweets.dto';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }

  async createUser(body: CreateUserDTO) {
    const { username, avatar } = body;
    const findUser = this.users.find(
      (user: User) => user.username === username,
    );

    if (findUser) {
      throw new HttpException('username already exist', HttpStatus.CONFLICT);
    }

    this.users.push(new User(username, avatar));
    throw new HttpException('ok', HttpStatus.OK);
  }

  async createTweet(body: CreateTweetDTO) {
    const { username, tweet } = body;
    const findUser = this.users.find(
      (user: User) => user.username === username,
    );
    if (!findUser) {
      throw new HttpException('username not exist', HttpStatus.UNAUTHORIZED);
    }

    return this.tweets.push(new Tweet(findUser, tweet));
  }
}

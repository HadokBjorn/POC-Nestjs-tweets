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
      (user: User) => user._username === username,
    );

    if (findUser) {
      throw new HttpException('username already exist', HttpStatus.CONFLICT);
    }

    this.users.push(new User(username, avatar));
  }

  async createTweet(body: CreateTweetDTO) {
    const { username, tweet } = body;
    const findUser = this.users.find(
      (user: User) => user._username === username,
    );
    if (!findUser) {
      throw new HttpException('username not exist', HttpStatus.UNAUTHORIZED);
    }

    return this.tweets.push(new Tweet(findUser, tweet));
  }

  getTweets(pageNumber: string) {
    const page = parseInt(pageNumber);
    if (page < 1) {
      throw new HttpException(
        'Informe uma página válida!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (page >= 1) {
      const pageInterval = 15;
      const limit: number = pageInterval * page;
      const offset: number = limit - pageInterval;
      const pagination = [...this.tweets]
        .reverse()
        .slice(offset, limit)
        .map((tweet: Tweet) => ({
          username: tweet._user._username,
          avatar: tweet._user._avatar,
          tweet: tweet._tweet,
        }));

      return pagination;
    }

    const tweets = this.tweets.slice(-15);
    const recentTweets = tweets.reverse().map((tweet: Tweet) => ({
      username: tweet._user._username,
      avatar: tweet._user._avatar,
      tweet: tweet._tweet,
    }));

    return recentTweets;
  }
}

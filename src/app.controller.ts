import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './dtos/users.dto';
import { CreateTweetDTO } from './dtos/tweets.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  createUser(@Body() body: CreateUserDTO) {
    return this.appService.createUser(body);
  }

  @Post('tweets')
  createTweet(@Body() body: CreateTweetDTO) {
    return this.appService.createTweet(body);
  }

  @Get('/tweets')
  getTweets(@Query('page') page: string) {
    return this.appService.getTweets(page);
  }
}

import { IsEmpty, IsString } from 'class-validator';

export class createTweetDTO {
  @IsString()
  @IsEmpty()
  username: string;

  @IsString()
  @IsEmpty()
  tweet: string;
}

import { IsEmpty, IsString, IsUrl } from 'class-validator';

export class createUserDTO {
  @IsString()
  @IsEmpty()
  username: string;

  @IsString()
  @IsEmpty()
  @IsUrl()
  avatar: string;
}

import { IsEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsEmpty()
  username: string;

  @IsString()
  @IsEmpty()
  @IsUrl()
  avatar: string;
}

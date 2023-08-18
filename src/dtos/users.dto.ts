import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  avatar: string;
}

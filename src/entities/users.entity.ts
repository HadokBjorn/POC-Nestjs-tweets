export class User {
  public readonly username: string;
  private readonly avatar: string;

  constructor(username: string, avatar: string) {
    this.username = username;
    this.avatar = avatar;
  }
}

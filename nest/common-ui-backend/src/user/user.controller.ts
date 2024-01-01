import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

export interface User {
  email: string;
  pass: string;
}

export interface UserSession {
  accessToken: string;
  refreshToken: string;
}

@Controller('/user')
export class UserController {
  constructor(
    private jwtService: JwtService,
  ) {} 

  @Post('/signin')
  async postSignin(@Body() signinPayload: Readonly<User>): Promise<UserSession> {
    Logger.log(`signin] ${signinPayload.email}, ${signinPayload.pass}`);

    const dummyUserId = 1;

    const accessToken = await this.jwtService.signAsync({
      sub: dummyUserId, 
      email: signinPayload.email,
    });
    const refreshToken = await this.jwtService.signAsync(
      { seed: 'dummySeed' },
      { secret: 'dummyRefreshSecret' },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
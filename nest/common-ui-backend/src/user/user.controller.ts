import { Body, Controller, Get, Logger, Post } from "@nestjs/common";

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
  contructor() {} 

  @Post('/signin')
  postSignin(@Body() signinPayload: Readonly<User>): UserSession {
    Logger.log(`signin] ${signinPayload.email}, ${signinPayload.pass}`);

    return {
      accessToken: 'dummyAccessToken',
      refreshToken: 'dummyRefreshToken'
    };
  }
}
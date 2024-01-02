import { BadRequestException, Body, Controller, Get, Logger, Post } from "@nestjs/common";
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

  @Post('/signup')
  async postSignUp(@Body() signinPayload: Readonly<User>): Promise<void> {
    Logger.log(`signup] ${signinPayload.email}, ${signinPayload.pass}`);

    const {email, pass} = signinPayload;

    if (!email || !pass) {
      throw new BadRequestException('invalid params');
    }

    // TODO: save to db
  }

  @Post('refresh')
  async postRefreshToken(@Body() payload: Readonly<UserSession>): Promise<UserSession> {
    const { accessToken, refreshToken } = payload;
    Logger.log(`refresh] accessToken: ${accessToken}, refreshToken: ${refreshToken}`);

    if (!accessToken) {
      throw new BadRequestException('invalid accessToken');
    }

    return {
      accessToken: 'newAccessToken', 
      refreshToken: 'newRefreshToken',
    };
  }
}
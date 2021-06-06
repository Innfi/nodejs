import 'reflect-metadata';
import { Controller, UseBefore, Param, Body, Get, Post } from 'routing-controllers';
import { Context } from 'koa';

interface UserData {
    userId: string;
    nickname: string;
    email: string;
};

function verifyLocal(context: Context, next: (err?: any) => Promise<any>): any {
    const authToken: string = context.request.header['authorization'] as string;

    if(authToken === 'Bearer tokenNeedsChange') return next();

    context.status = 401;
    context.message = 'authentication failed';
}

@Controller()
export class UserControllerKoa {
    @Get('/user/:userId')
    @UseBefore(verifyLocal)
    loadUser(@Param('userId') userId: string) {
        return 'loadUser response';
    }

    @Post('/user/:userId')
    saveUser(@Param('userId') userId: string, @Body() userData: UserData) {
        return 'saveUser response';
    }
}
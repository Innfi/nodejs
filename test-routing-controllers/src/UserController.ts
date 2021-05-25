import 'reflect-metadata';
import { Controller, UseBefore, Param, Body, Get, Post } from 'routing-controllers';
import { Next } from 'koa';

interface UserData {
    userId: string;
    nickname: string;
    email: string;
}

async function verifyLocal(req: Request, res: Response, next: Next): Promise<void> {
    //todo: authentication

    return next();
}

@Controller()
export class UserController {
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
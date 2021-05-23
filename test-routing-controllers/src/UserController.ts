import 'reflect-metadata';
import { Controller, Param, Body, Get, Post } from 'routing-controllers';

interface UserData {
    userId: string;
    nickname: string;
    email: string;
}

@Controller()
export class UserController {
    @Get('/user/:userId')
    loadUser(@Param('userId') userId: string) {
        return 'loadUser response';
    }

    @Post('/user/:userId')
    saveUser(@Param('userId') userId: string, @Body() userData: UserData) {
        return 'saveUser response';
    }
}
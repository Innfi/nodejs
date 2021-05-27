import 'reflect-metadata';
import { JsonController, UseBefore, Post, Body } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';


interface AuthData {
    email: string;
    passwordHash: string;
};

async function verifyLocal(
    request: Request, 
    response: Response, 
    next: NextFunction): Promise<void> {

    const email: string = request.body.email;
    const passwordHash: string = request.body.passwordHash;

    //TODO: passwordHash matching by email
    if(true) return next();

    response.send(401).end(); //what will happen?
}

async function verifyJwt(
    request: Request, 
    response:Response,
    next: NextFunction): Promise<void> {

    //todo: jwt authentication

    return next();
}

@JsonController()
export class UserControllerExpress {
    @Post('/signin')
    @UseBefore(verifyLocal)
    signin(@Body() authData: AuthData) {

    }

    @Post('/private')
    @UseBefore(verifyJwt)
    private() {

    }
}
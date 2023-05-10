import { Body, Controller, Get, Inject, Post, Put, Query, Req, Res } from '@nestjs/common';
import { NewUserDto } from '../../Dtos/newUser.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { UserCredentialsDto } from '../../Dtos/userCredentials.dto';
import { WrongCredentialsException } from 'apps/auth/src/exceptions/wrongCredentialsException';

@Controller('auth')
export class AuthController {

    constructor(@Inject('AUTH_SERVICE') private clientAuth: ClientProxy){}

    @Post('registro')
    registro(@Body() newUserDto: NewUserDto, @Res() response: Response){
        
        this.clientAuth.send({cmd: "new_user"}, newUserDto).subscribe((value: any) => {

            if(value.status) return response.status(value.status).json(value);

            return response.json({
                ok: true
            })

        });

    }

    @Put('login')
    login(@Body() credentials: UserCredentialsDto, @Res() response: Response){
        
        this.clientAuth.send({cmd: "login"}, credentials).subscribe((value: any) => {

            if(value.status) return response.status(value.status).json(value);

            return response.json({
                ok: true,
                jwt: value
            })

        });

    }

    @Get('users')
    getUsers(@Req() req: Request, @Res() response: Response, @Query('page') page?: number){

        const jwt = req.headers.authorization?? "";

        this.clientAuth.send({cmd: "get_users"}, {jwt, page: page}).subscribe((value: any) => {

            if(value.status) return response.status(value.status).json(value);

            return response.json({
                ok: true,
                value: value
            });

        });
        
    }

}

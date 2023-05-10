import { HttpException, HttpStatus } from '@nestjs/common';

export class JwtInvalidException extends HttpException{

    constructor(reason: string){
        super(reason, HttpStatus.BAD_REQUEST);
    }

}
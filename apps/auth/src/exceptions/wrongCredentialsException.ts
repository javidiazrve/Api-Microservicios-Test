import { HttpException, HttpStatus } from "@nestjs/common";

export class WrongCredentialsException extends HttpException{

    constructor() {
        super("Email or Password Incorrect.", HttpStatus.BAD_REQUEST);
    }

}
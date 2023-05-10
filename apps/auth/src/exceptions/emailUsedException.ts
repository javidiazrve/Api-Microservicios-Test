import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailUsedException extends HttpException{

    constructor(usedEmail: string) {
      super({
        cause: "Email already in use",
        value: usedEmail,
      }, HttpStatus.BAD_REQUEST);
    }

}
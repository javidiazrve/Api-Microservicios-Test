import { IsNotEmpty } from 'class-validator';
import { IsEmail, IsString } from 'class-validator';

export class UserCredentialsDto {

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password:string;

}
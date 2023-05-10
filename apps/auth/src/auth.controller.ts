import { Body, Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserCredentialsDto } from './dtos/userCredentials.dto';
import { AuthService } from './auth.service';
import { EmailUsedException } from './exceptions/emailUsedException';
import { WrongCredentialsException } from './exceptions/wrongCredentialsException';
import * as JWT from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { JwtInvalidException } from './exceptions/jwtInvalidException';

@Controller()
export class AuthController {
  constructor(@Inject('NEGOCIO_SERVICE') private clientAuth: ClientProxy, private authService: AuthService) {}

  @MessagePattern({ cmd: 'new_user' })
  async createNewUser(createUserDto: CreateUserDto){

    // Revisamos si hay algun usuario con el mismo email.
    const emailUsed = await this.authService.findByEmail(createUserDto.email);
    
    // Si existe alguno mandamos un error.
    if(emailUsed) return new EmailUsedException(emailUsed.email);

    // Generamos password encriptada usando la libreria bcrypt, para luego guardarla en la base de datos.
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(createUserDto.password, salt);
    createUserDto.password = hash;

    // Guardamos el usuario en la base de datos.
    await this.authService.create(createUserDto);

    return true;
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Body() credentials: UserCredentialsDto){
    
    // Obtenemos el usuario.
    const user = await this.authService.findByEmail(credentials.email);

    // Si no existe mandamos el error de credenciales.
    if(!user) return new WrongCredentialsException();

    // Generamos el JsonWebToken y lo enviamos.
    const jwt = JWT.sign({email: user.email}, "CUSTOM-SECRET-KEY", {expiresIn: "10h"});

    return jwt;
  }

  @MessagePattern({ cmd: 'get_users' })
  getUsers(data: any){

    const {jwt} = data;

    if(!jwt) return new JwtInvalidException("Token Required.");

    // Mandamos la peticion al microservicio correspondiente y retornamos su respuesta.
    return this.clientAuth.send({cmd: 'get_users'}, data);
  }
}

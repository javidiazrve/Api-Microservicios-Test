import { Controller } from '@nestjs/common';
import { NegocioService } from './negocio.service';
import { MessagePattern } from '@nestjs/microservices';
import { JwtInvalidException } from './exceptions/jwtInvalidException';

import * as JWT from "jsonwebtoken";

@Controller()
export class NegocioController {
  constructor(private readonly negocioService: NegocioService) {}

  @MessagePattern({ cmd: 'get_users' })
  async getUsers(data: any){
    const { jwt, page } = data;

    if(!jwt) return new JwtInvalidException("Token Required.");

    try {
      JWT.verify(jwt, "CUSTOM-SECRET-KEY");
    } catch (error) {
      return new JwtInvalidException(error.message);
    }
    
    const usuarios = await this.negocioService.getUsers(page);
    
    if(page){
      return {
        usuarios,
        page
      } 
    }else{
      return {
        usuarios,
        count: usuarios.length
      }
    }
  }
}

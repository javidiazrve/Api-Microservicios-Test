import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class NegocioService {
  
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  
  async getUsers(page?: number){

    if(page && page > 0){
      return this.userModel.find().limit(10)
      .skip((page - 1) * 10)
      .exec();
    }

    return this.userModel.find().exec();
  }
}

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUser(userName: string): Promise<any> {
    try {
      return await this.userModel.findOne({ userName }).lean();
    } catch (err) {
      console.log(`err: ${err}`);
    }
  }

  async addUser(newUser: User): Promise<any> {
    return await this.userModel.create(newUser);
  }
}

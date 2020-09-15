import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user.schema';
import { adminSeed } from '../assets/admin.seed';

@Injectable()
export class UserSeedService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async seedAdmin(): Promise<User> {
    const options = { upsert: true, setDefaultsOnInsert: true };
    return this.userModel.updateOne(
      { email: adminSeed.email },
      adminSeed,
      options,
    );
  }
}

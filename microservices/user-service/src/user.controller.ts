/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { Metadata } from 'grpc';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Types } from 'mongoose';
import {
  UserData,
  NewUser,
  UserId,
  UserResponse,
  UserEmail,
  IsValid,
} from '../../../proto/build/user';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @GrpcMethod('UserService', 'Create')
  async create(userData: UserData, _metadata: Metadata): Promise<NewUser> {
    const { _id, firstName, lastName, email, isAdmin, createdAt } = await (
      await this.userService.create(userData)
    ).toJSON();
    return {
      id: (_id as Types.ObjectId).toHexString(),
      firstName,
      lastName,
      email,
      isAdmin,
      createdAt: createdAt.toISOString(),
    };
  }

  @GrpcMethod('UserService', 'FindUser')
  async findUser({ id }: UserId, _metadata: Metadata): Promise<UserResponse> {
    const user = await this.userService.findById(id);
    if(!user) throw new RpcException('User does not exist')
    const {
      firstName,
      lastName,
      email,
      hash,
      isAdmin,
      createdAt,
      updatedAt,
    } = user;
    return {
      id,
      firstName,
      lastName,
      email,
      hash,
      isAdmin,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  }

  @GrpcMethod('UserService', 'FindUserByEmail')
  async findUserByEmail(
    { email: mail }: UserEmail,
    _metadata: Metadata,
  ): Promise<UserResponse> {
    const user = await this.userService.findByEmail(mail);
    if (!user) throw new RpcException('User with the email does not exist');
    const {
      _id,
      firstName,
      lastName,
      email,
      hash,
      isAdmin,
      createdAt,
      updatedAt,
    } = user;
    return {
      id: (_id as Types.ObjectId).toHexString(),
      firstName,
      lastName,
      email,
      hash,
      isAdmin,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    };
  }
  @GrpcMethod('UserService', 'DoesUserExistByEmail')
  async doesUserExistByEmail({ email }): Promise<IsValid> {
    const user = await this.userService.findByEmail(email);
    return { isExist: user ? true : false };
  }
}

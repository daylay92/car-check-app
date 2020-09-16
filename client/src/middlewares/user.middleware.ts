/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */

import { ClientGrpc } from '@nestjs/microservices';
import { UserService } from '../../../proto/build/user';
import { promisify } from '../utils';
import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  private userService: UserService;
  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}
  onModuleInit(): void {
    this.userService = promisify(
      this.client.getService<UserService>('UserService'),
    );
  }
  async use(req: Request, res: Response, next: Function): Promise<void> {
    const { userId } = req.params;
    try {
      if (!userId)
        res.status(400).json({
          status: 'error',
          message: 'A valid userId is required',
        });
      else {
        await this.userService.FindUser({ id: userId });
        next();
      }
    } catch (e) {
        const regex = /User/i;
      if (regex.test(e.details)) {
        res.status(400).json({
          status: 'error',
          message: e.details,
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'Error validating userId',
        });
      }
    }
  }

  static VerifyOwner(prop = 'params'){
    return (req: Request, res: Response, next: Function): void => {
      //@ts-ignore
      if(req.data.id === req[prop].userId) next();
      else {
          res.status(403).json({
              status: 'error',
              message: "You do not have the permission to impersonate the owner"
          })
      }
    };
  }
  

}

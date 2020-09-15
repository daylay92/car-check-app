/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */

import { ClientGrpc } from '@nestjs/microservices';
import { AuthService } from '../../../proto/build/auth';
import { promisify, retrieveToken } from '../utils';
import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
  private authService: AuthService;
  constructor(@Inject('AUTH_PACKAGE') private client: ClientGrpc) {}
  onModuleInit(): void {
    this.authService = promisify(
      this.client.getService<AuthService>('AuthService'),
    );
  }
  async use(req: Request, res: Response, next: Function): Promise<void> {
    const {
      headers: { authorization },
    } = req;

    try {
      if (!authorization) {
        res.status(401).json({
          status: 'error',
          message: 'An authentication token is required',
        });
      } else {
        const token = retrieveToken(authorization);
        const decoded = await this.authService.Authenticate({ token });
        //@ts-ignore
        req.data = decoded;
        next();
      }
    } catch (err) {
      const regex = /token/i;
      if (regex.test(err.message)) {
        res.status(401).json({
          status: 'error',
          message: 'Invalid Token',
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'Error validating Token',
        });
      }
    }
  }
}

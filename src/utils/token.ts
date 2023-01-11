import { InternalServerError } from 'http-errors';
import jwt from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import debug from 'debug';

const logger = debug('token_gen');

const db = new PrismaClient();

const { SECRET } = process.env;
export default class TokenGenerator {
  userId: string;
  token: string;
  constructor(userId: string) {
    this.userId = userId;
  }
  generate(): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
      logger('creating access_token: start');
      jwt.sign(
        { user: this.userId },
        SECRET,
        { expiresIn: '1hr' },
        async (err: any, token: string) => {
          if (!err && token) {
            const refreshToken = uuidV4();
            try {
              logger('updating user with refreshToken: Start');
              await db.user.update({
                where: {
                  id: this.userId,
                },
                data: {
                  refreshToken,
                },
              });
              logger('updating user with refreshToken: end');
              resolve([token, refreshToken]);
            } catch (err) {
              logger('access_token error: %O', err);
              reject(new InternalServerError(err.message));
            }
          } else {
            logger('access_token error: %O', err);
            reject(new InternalServerError('could not create access token'));
          }
          logger('creating access_token: end');
        }
      );
    });
  }
  static verify(token: string): false | { user: string } {
    try {
      const decoded: { user: string } = jwt.verify(token, SECRET);
      if (decoded) {
        return decoded;
      }
      return false;
    } catch (err) {
      return false;
    }
  }
  refresh(token: string) {
    //
  }
}

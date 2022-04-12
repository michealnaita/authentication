import express, { Router, Response, Request } from 'express';
import validateUser from '../utils/validateUser';
import debug from 'debug';
import TokenGenerator from '../utils/token';
import { BadRequest, InternalServerError } from 'http-errors';

declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}

const router: Router = express.Router();
const logger = debug('jwt');

// Serve protected page
router.get('/', authMiddlware, async (req: Request, res: Response) => {
  //
});

// serve login page
router.get('/login', (_, res: Response) => {
  res.send('Hello Jwt');
});

// Login api endpoint
// TODO: handle remember me
router.post(
  '/login',
  async (
    req: Request<
      {},
      { success?: true; error?: true; error_message?: string },
      LoginPayload
    >,
    res: Response
  ) => {
    try {
      logger('Logging in user');
      const payload = req.body;
      const user: string | boolean = await validateUser(payload);
      if (!user) throw new BadRequest('Invalid credentials');
      const tokenGen = new TokenGenerator(user);
      const [accessToken, refreshToken]: string[] = await tokenGen.generate();
      if (!accessToken) {
        logger('failed to create users token user:' + user);
        throw new InternalServerError();
      }
      res.statusCode = 200;
      res.cookie('accesstoken', accessToken, {
        path: '/jwt',
      });
      res.json({ success: true, refreshToken });
    } catch (e) {
      errorHandler(e, res);
    }
  }
);

// Log out route
router.get('/logout', authMiddlware, async (req: Request, res: Response) => {
  //
});

router.use((req, res, next) => {
  res.statusCode = 403;
  res.send('method not allowed');
});

async function authMiddlware(req: Request, res: Response, next: any) {
  //
  next();
}
function errorHandler(err, res: Response) {
  logger(err.message);
  if (err instanceof InternalServerError) {
    res.statusCode = err.status;
    res.json({
      error: true,
      error_messgae: 'Something went wrong',
    });
    return;
  }
  res.statusCode = err.status || 500;
  res.json({
    error: true,
    error_messgae: err.message,
  });
}
export default router;

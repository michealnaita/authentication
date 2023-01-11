import express, { Router, Response, Request } from 'express';
import utils from '../utils';
import { NotAuthorised } from '../utils/errors';
import validateSession from '../utils/validateSession';
import validateUser from '../utils/validateUser';
import debug from 'debug';
import clearSession from '../utils/clearSession';

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
const logger = debug('session');

// Serve protected page
router.get('/', authMiddlware, async (req: Request, res: Response) => {
  res.render('session-protected');
});

// serve login page
router.get('/login', (_, res: Response) => {
  res.render('session');
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
      if (!user) {
        res.statusCode = 400;
        res.json({ error: true, error_message: 'wrong credentials' });
        return;
      }
      const usersSession: string | false = await utils.saveSession(user);
      if (!usersSession) {
        res.statusCode = 500;
        res.json({ error: true, error_message: 'something went wrong' });
        return;
      }
      res.statusCode = 200;
      res.cookie('sessionId', usersSession, {
        path: '/session',
      });
      res.json({ success: true });
    } catch (e) {
      console.log('error', e);
    }
  }
);

// Log out route
router.get('/logout', authMiddlware, async (req: Request, res: Response) => {
  try {
    const user: string | undefined = req.user;
    if (!user) throw new NotAuthorised('Not');
    await clearSession(user);
    res.clearCookie('sessionId', { path: '/session' });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
  }
});

router.use((req, res, next) => {
  res.statusCode = 403;
  res.send('method not allowed');
});

async function authMiddlware(req: Request, res: Response, next: any) {
  const sessionId: string = req.cookies.sessionId || null;
  logger('Validating user session id: ' + sessionId);
  try {
    if (!sessionId) throw new NotAuthorised('Missing Session token');
    const isValidSession: boolean = await validateSession(sessionId);
    if (!isValidSession) throw new NotAuthorised('Invalid session Id');
    req.user = sessionId;
  } catch (err) {
    if (err instanceof NotAuthorised) {
      res.redirect('/session/login');
      return;
    }
  }
  next();
}
export default router;

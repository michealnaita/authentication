import express, { Router, Response, Request } from 'express';
import utils from '../utils';
interface LoginPayload {
  email: string;
  password: string;
  remember: boolean;
}
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.setHeader('content-type', 'application/json');
  res.send(JSON.stringify(req.headers));
  console.log(req.cookies);
});

// render login page
router.get('/login', (req: Request, res: Response) => {
  res.render('session');
});

// login api endpoint
// TODO: handle remember me
router.post('/login', async (req: Request, res: Response) => {
  try {
    const payload: LoginPayload = req.body;
    const user: string | boolean = await utils.validateUser(payload);
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
    res.json({ sucess: true });
  } catch (e) {
    console.log('error', e);
  }
});

router.use((req, res, next) => {
  res.statusCode = 403;
  res.send('method not allowed');
});
export default router;

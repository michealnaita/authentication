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

// user
router.post('/login', async (req: Request, res: Response) => {
  const payload: LoginPayload = req.body;
  const user: string | boolean = await utils.validateUser(payload);
  if (!user) {
    res.json({ error: true, error_message: 'wrong credentials' });
    return;
  }
  const usersSession: string | false = await utils.saveSession(user);
  // TODO: set session_id in cookie
});
export default router;

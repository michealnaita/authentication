import express, { Router, Response, Request } from 'express';
const router: Router = express.Router();
router.get('/', (req: Request, res: Response) => {
  res.send('you have been loged in ');
});
router.get('/login', (req: Request, res: Response) => {
  res.render('session');
});

export default router;

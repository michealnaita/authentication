/**
 * Module Dependencies
 */
import express, { Express } from 'express';
import sessionRoute from './sessionAuth';
import { engine } from 'express-handlebars';
import path from 'path';
import cookieParser from 'cookie-parser';

const app: Express = express();
app.use(cookieParser());
app.use(express.json());

// view engine
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '/../', 'views'));

// serving static assets
app.use('/public', express.static(path.join(__dirname, '/../', 'public')));

// route controllers
app.get('/', (req, res) => {
  res.render('index');
});
app.use('/session', sessionRoute);

// error handling
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500);
  res.send('something went wrong');
});

// spin server
app.listen(3000, () => {
  console.log('server running on port 3000');
});

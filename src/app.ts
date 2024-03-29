/**
 * Module Dependencies
 */
import express, { Express } from 'express';
import sessionRoute from './sessionAuth';
import jwtRoute from './jwtAuth';
import { engine } from 'express-handlebars';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();
const app: Express = express();
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

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
app.use('/jwt', jwtRoute);

// error handling
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(err.status || 500);
  res.send('something went wrong');
});

// spin server
app.listen(3000, () => {
  console.log('server running on port 3000');
});

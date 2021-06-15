import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './error/not-found-error';
const app = express();

//Accept proxy
app.set('trust proxy', true);
app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    //authorize uniquement HTTPS
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

// match all request who not exist
app.all('*', async () => {
  throw new NotFoundError();
});

export { app };

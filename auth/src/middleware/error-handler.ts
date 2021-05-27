import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../error/custom-error';

// 4 argument pour indiquer une gestion de l'erreur express
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // will check if each error has a message and field property in TS, similare to interface
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  res.status(400).send({
    errors: [
      {
        message: 'Something went wrong',
      },
    ],
  });
};

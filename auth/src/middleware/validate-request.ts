import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../error/request-validation-error';

//Middlewxare join function with factory function
export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw new RequestValidationError(error);
    }
    next();
  };
};

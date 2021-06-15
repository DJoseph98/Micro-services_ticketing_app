import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 400;
  constructor() {
    super('Route not found'); //only for loging purpose

    //Only because for implement extended Error class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not found' }];
  }
}
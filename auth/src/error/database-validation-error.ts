import { CustomError } from './custom-error';

export class DatabaseValidationError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';
  constructor() {
    super('Error connecting to database'); //only for loging purpose

    //Only because for implement extended Error class
    Object.setPrototypeOf(this, DatabaseValidationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}

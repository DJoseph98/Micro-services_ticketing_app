import { ValidationError } from 'joi';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError) {
    super('Invalid request parameters'); //only for loging purpose

    //Only because for implement extended Error class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    //loop from object syntax joi module
    return this.errors.details.map((error) => {
      return { message: error.message, field: error.path[0].toString() };
    });
  }
}

import HttpStatus from '../constants/http-status';
import HttpError from './http-error';

// Ошибка 500 - Internal Server Error
export default class InternalServerError extends HttpError {
  constructor(message: string = 'На сервере произошла ошибка') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

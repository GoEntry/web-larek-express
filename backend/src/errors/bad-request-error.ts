import HttpStatus from '../constants/http-status';
import HttpError from './http-error';

// Ошибка 400 - Bad Request
export default class BadRequestError extends HttpError {
  constructor(message: string = 'Переданы некорректные данные') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

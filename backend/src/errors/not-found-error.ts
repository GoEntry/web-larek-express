import HttpStatus from '../constants/http-status';
import HttpError from './http-error';

// Ошибка 404 - Not Found
export default class NotFoundError extends HttpError {
  constructor(message: string = 'Ресурс не найден') {
    super(message, HttpStatus.NOT_FOUND);
  }
}

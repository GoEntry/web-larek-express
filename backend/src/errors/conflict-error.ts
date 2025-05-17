import HttpStatus from '../constants/http-status';
import HttpError from './http-error';

// Ошибка 409 - Conflict
export default class ConflictError extends HttpError {
  constructor(message: string = 'Ресурс уже существует') {
    super(message, HttpStatus.CONFLICT);
  }
}

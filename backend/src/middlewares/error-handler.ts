import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors';
import HttpStatus from '../constants/http-status';

// Middleware для обработки ошибок
const errorHandler = (
  err: Error | HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // eslint-disable-next-line no-console
  console.error('Ошибка:', err);

  // Если это наша кастомная ошибка HttpError
  if ('statusCode' in err) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Обработка ошибки MongoDB E11000 (дубликат уникального поля)
  if (err instanceof Error && err.message.includes('E11000')) {
    return res.status(HttpStatus.CONFLICT).json({ message: 'Товар с таким названием уже существует' });
  }

  // По умолчанию - ошибка сервера 500
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'На сервере произошла ошибка' });
};

export default errorHandler;

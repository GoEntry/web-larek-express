// Базовый класс ошибки
export class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

// Ошибка 400 - Bad Request
export class BadRequestError extends HttpError {
  constructor(message: string = 'Переданы некорректные данные') {
    super(message, 400);
  }
}

// Ошибка 404 - Not Found
export class NotFoundError extends HttpError {
  constructor(message: string = 'Ресурс не найден') {
    super(message, 404);
  }
}

// Ошибка 409 - Conflict
export class ConflictError extends HttpError {
  constructor(message: string = 'Ресурс уже существует') {
    super(message, 409);
  }
}

// Ошибка 500 - Internal Server Error
export class InternalServerError extends HttpError {
  constructor(message: string = 'На сервере произошла ошибка') {
    super(message, 500);
  }
}

import winston from 'winston';
import expressWinston from 'express-winston';
import path from 'path';
import fs from 'fs';

// Путь к логам
const logsDir = path.join(__dirname, '../../logs');

// Создаем директорию для логов, если она не существует
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Настройка формата логирования
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

// Логгер запросов
export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: path.join(logsDir, 'request.log') }),
  ],
  format: logFormat,
  meta: true,
  metaField: 'meta',
  requestWhitelist: ['url', 'method', 'httpVersion', 'originalUrl', 'query', 'body'],
  responseWhitelist: ['statusCode', 'statusMessage'],
  bodyBlacklist: ['password', 'token'],
});

// Логгер ошибок
export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: path.join(logsDir, 'error.log') }),
  ],
  format: logFormat,
  meta: true,
});

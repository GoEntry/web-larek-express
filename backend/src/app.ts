import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';

// Импорт middleware и маршрутов
import routes from './routes';
import errorHandler from './middlewares/error-handler';
import { requestLogger, errorLogger } from './middlewares/logger';

// Создание приложения Express
const app = express();
const PORT = 3000;

// Подключение middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Раздача статических файлов

// Подключение логгера запросов
app.use(requestLogger);

// Подключение маршрутов
app.use(routes);

// Подключение логгера ошибок
app.use(errorLogger);

// Обработка ошибок celebrate
app.use(errors());

// Подключение middleware обработки ошибок
app.use(errorHandler);

// Функция запуска сервера
async function startServer() {
  try {
    // Дожидаемся подключения к MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/weblarek');
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
    // Запускаем сервер только после успешного подключения к базе данных
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Выходим с кодом ошибки, если не удалось подключиться к БД
  }
}

// Запуск сервера
startServer();

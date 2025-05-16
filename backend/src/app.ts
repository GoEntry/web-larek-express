import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';

// Импорт маршрутов
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';

// Импорт middleware обработки ошибок
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/http-errors';

// Импорт логгеров
import { requestLogger, errorLogger } from './middlewares/logger';

// Подключение middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Подключение логгера запросов
app.use(requestLogger);

// Подключение к MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/weblarek')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Подключение маршрутов
app.use('/product', productRoutes);
app.use('/order', orderRoutes);

// Обработка несуществующих маршрутов
app.use((_req, _res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

// Подключение логгера ошибок
app.use(errorLogger);

// Обработка ошибок celebrate
app.use(errors());

// Подключение middleware обработки ошибок
app.use(errorHandler);

// Запуск сервера
app.listen(3000, () => {
  console.log('App listening on port 3000');
});

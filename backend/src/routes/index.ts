import { Router } from 'express';
import productRoutes from './products';
import orderRoutes from './orders';
import { NotFoundError } from '../errors';

const router = Router();

// Подключение маршрутов
router.use('/product', productRoutes);
router.use('/order', orderRoutes);

// Обработка несуществующих маршрутов
router.use((_req, _res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

export default router;

import { Router } from 'express';
import { createOrder } from '../controllers/orders';
import { validateCreateOrder } from '../validation/order-validation';

const router = Router();

// Создание нового заказа
router.post('/', validateCreateOrder, createOrder);
export default router;

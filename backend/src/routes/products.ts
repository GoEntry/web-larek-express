import { Router } from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/products';
import { validateCreateProduct, validateProductId } from '../validation/product-validation';

const router = Router();

// Получение всех товаров
router.get('/', getProducts);

// Получение товара по ID
router.get('/:productId', validateProductId, getProductById);

// Создание нового товара
router.post('/', validateCreateProduct, createProduct);

export default router;

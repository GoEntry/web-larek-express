import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import { NotFoundError, ConflictError } from '../errors';
import HttpStatus from '../constants/http-status';

// Получение всех товаров
export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find({});
    // Возвращаем ответ в формате, ожидаемом фронтендом
    return res.status(HttpStatus.OK).json({
      items: products,
      total: products.length,
    });
  } catch (error) {
    next(error);
    return undefined;
  }
};

// Получение товара по ID
export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError('Товар с указанным ID не найден');
    }
    return res.status(HttpStatus.OK).json(product);
  } catch (error) {
    next(error);
    return undefined;
  }
};

// Создание нового товара
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      image,
      category,
      description,
      price,
    } = req.body;

    // Создание нового товара
    const product = await Product.create({
      title,
      image,
      category,
      description,
      price,
    });

    return res.status(HttpStatus.CREATED).json(product);
  } catch (error) {
    // Проверка на дубликат (уникальный title)
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('Товар с таким названием уже существует'));
    }
    next(error);
    return undefined;
  }
};

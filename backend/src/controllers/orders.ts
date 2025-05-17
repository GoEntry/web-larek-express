import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import { BadRequestError, NotFoundError } from '../errors';
import HttpStatus from '../constants/http-status';

// Интерфейс для тела запроса создания заказа
interface IOrderRequest {
  payment: 'card' | 'online';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[]; // массив _id товаров
}

// Интерфейс для ответа при создании заказа
interface IOrderResponse {
  id: string;
  total: number;
}

// Создание нового заказа
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      payment: _payment,
      email: _email,
      phone: _phone,
      address: _address,
      total,
      items,
    } = req.body as IOrderRequest;

    // Получение товаров из базы по id
    const products = await Product.find({ _id: { $in: items } });

    // Проверка что все товары существуют
    if (products.length !== items.length) {
      throw new NotFoundError('Некоторые товары не найдены');
    }

    // Проверка что все товары имеют цену (не null)
    const invalidProducts = products.filter((product) => product.price === null);
    if (invalidProducts.length > 0) {
      throw new BadRequestError('Некоторые товары не продаются (цена не указана)');
    }

    // Проверка на соответствие суммы заказа
    const calculatedTotal = products.reduce((sum, product) => sum + (product.price || 0), 0);
    if (calculatedTotal !== total) {
      throw new BadRequestError('Сумма заказа не соответствует стоимости товаров');
    }

    // Генерация уникального id заказа с помощью faker
    const orderId = faker.string.uuid();

    // Возвращаем ответ в формате, ожидаемом фронтендом
    const response: IOrderResponse = {
      id: orderId,
      total,
    };

    return res.status(HttpStatus.CREATED).json(response);
  } catch (error) {
    next(error);
    return undefined;
  }
};

export default createOrder;

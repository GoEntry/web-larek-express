import { Joi, Segments, celebrate } from 'celebrate';

// Схема для валидации создания заказа
export const validateCreateOrder = celebrate({
  [Segments.BODY]: Joi.object({
    payment: Joi.string().valid('card', 'online').required()
      .messages({
        'string.empty': 'Поле "payment" должно быть заполнено',
        'any.only': 'Значение поля "payment" должно быть "card" или "online"',
        'any.required': 'Поле "payment" обязательно',
      }),
    email: Joi.string().email().required()
      .messages({
        'string.empty': 'Поле "email" должно быть заполнено',
        'string.email': 'Поле "email" должно быть валидным email-адресом',
        'any.required': 'Поле "email" обязательно',
      }),
    phone: Joi.string().required()
      .messages({
        'string.empty': 'Поле "phone" должно быть заполнено',
        'any.required': 'Поле "phone" обязательно',
      }),
    address: Joi.string().required()
      .messages({
        'string.empty': 'Поле "address" должно быть заполнено',
        'any.required': 'Поле "address" обязательно',
      }),
    total: Joi.number().positive().required()
      .messages({
        'number.base': 'Поле "total" должно быть числом',
        'number.positive': 'Поле "total" должно быть положительным числом',
        'any.required': 'Поле "total" обязательно',
      }),
    items: Joi.array().items(Joi.string()).min(1).required()
      .messages({
        'array.base': 'Поле "items" должно быть массивом',
        'array.min': 'В заказе должен быть хотя бы один товар',
        'any.required': 'Поле "items" обязательно',
      }),
  }),
});

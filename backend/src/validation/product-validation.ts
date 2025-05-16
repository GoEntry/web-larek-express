import { Joi, Segments, celebrate } from 'celebrate';

// Схема для валидации создания товара
export const validateCreateProduct = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(30).required()
      .messages({
        'string.empty': 'Поле "title" должно быть заполнено',
        'string.min': 'Минимальная длина поля "title" - 2',
        'string.max': 'Максимальная длина поля "title" - 30',
        'any.required': 'Поле "title" обязательно',
      }),
    image: Joi.object({
      fileName: Joi.string().required()
        .messages({
          'string.empty': 'Поле "fileName" должно быть заполнено',
          'any.required': 'Поле "fileName" обязательно',
        }),
      originalName: Joi.string().required()
        .messages({
          'string.empty': 'Поле "originalName" должно быть заполнено',
          'any.required': 'Поле "originalName" обязательно',
        }),
    }).required()
      .messages({
        'any.required': 'Поле "image" обязательно',
      }),
    category: Joi.string().required()
      .messages({
        'string.empty': 'Поле "category" должно быть заполнено',
        'any.required': 'Поле "category" обязательно',
      }),
    description: Joi.string().allow(''),
    price: Joi.number().allow(null),
  }),
});

// Схема для валидации получения товара по ID
export const validateProductId = celebrate({
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().required()
      .messages({
        'string.empty': 'ID товара должен быть заполнен',
        'any.required': 'ID товара обязателен',
      }),
  }),
});

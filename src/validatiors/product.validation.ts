import Joi from 'joi';

export const productValidation = {
  create: {
    body: Joi.object({
      name: Joi.string().min(2).required().messages({
        'string.empty': 'Product name is required.',
        'string.min': 'Product name must be at least 2 characters long.',
      }),
      description: Joi.string().min(10).required().messages({
        'string.empty': 'Description is required.',
        'string.min': 'Description must be at least 10 characters long.',
      }),
      price: Joi.number().positive().required().messages({
        'number.base': 'Price must be a valid number.',
        'number.positive': 'Price must be greater than zero.',
      }),
      quantity: Joi.number().integer().min(0).required().messages({
        'number.base': 'Quantity must be an integer.',
        'number.min': 'Quantity cannot be less than zero.',
      }),
      low_stock_threshold: Joi.number().integer().min(0).required().messages({
        'number.base': 'Low stock threshold must be an integer.',
        'number.min': 'Low stock threshold cannot be less than zero.',
      }),
      supplier: Joi.string().optional().allow(null, '').messages({
        'string.base': 'Supplier name must be a string.',
      }),
      category_id: Joi.number().required().messages({
        'number.base': 'Category ID must be a valid number.',
        'any.required': 'Category ID is required.',
      }),
      added_by: Joi.number().required().messages({
        'number.base': 'Added by must be a valid user ID.',
        'any.required': 'Added by is required.',
      }),
    }),
  },

  update: {
    body: Joi.object({
      name: Joi.string().min(2).optional(),
      description: Joi.string().min(10).optional(),
      price: Joi.number().positive().optional(),
      quantity: Joi.number().integer().min(0).optional(),
      low_stock_threshold: Joi.number().integer().min(0).optional(),
      supplier: Joi.string().optional().allow(null, ''),
      category_id: Joi.number().optional(),
    }).or('name', 'description', 'price', 'quantity', 'low_stock_threshold', 'supplier', 'category_id').messages({
      'object.missing': 'At least one field is required to update the product.',
    }),
  },

  updateStock: {
    body: Joi.object({
      quantityChange: Joi.number().integer().required().messages({
        'number.base': 'Quantity change must be a valid number.',
        'number.integer': 'Quantity change must be an integer.',
        'any.required': 'Quantity change is required.'
      })
    })
  }

};

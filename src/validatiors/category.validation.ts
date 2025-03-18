import Joi from 'joi';

export const categoryValidation = {
  createOrUpdate: {
    body: Joi.object({
      name: Joi.string().min(2).required().messages({
        'string.empty': 'Category name is required.',
        'string.min': 'Category name should be at least 2 characters long.'
      }),
      parentId: Joi.number().allow(null).optional().messages({
        'number.base': 'Parent ID must be a number or null.'
      })
    })
  }
};

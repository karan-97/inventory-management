import Joi from 'joi';

export const categoryValidation = {
    createOrUpdate: {
      body: Joi.object({
        name: Joi.string().required().messages({
          'string.empty': 'Category name is required.',
        }),
        parentId: Joi.number().optional(),
      }),
    },
  };

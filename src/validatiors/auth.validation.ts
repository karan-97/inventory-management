import Joi from 'joi';

const registerValidation = {
  body: Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.empty': 'Name is required.',
      'string.min': 'Name should have a minimum length of 3.',
    }),
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required.',
      'string.email': 'Invalid email format.',
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password should have a minimum length of 6.',
    }),
    role: Joi.string().valid('admin', 'user').required().messages({
      'any.only': 'Role must be either "admin" or "user".',
      'string.empty': 'Role is required.'
    }),
  }),
};

const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required().messages({
      'string.empty': 'Email is required.',
      'string.email': 'Please provide a valid email address.'
    }),
    password: Joi.string().min(6).required().messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least 6 characters long.'
    })
  })
};

export { registerValidation, loginValidation };

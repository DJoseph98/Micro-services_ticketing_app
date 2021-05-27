import Joi from 'joi';

export const signupSchema = Joi.object().keys({
  email: Joi.string().required().email({ minDomainSegments: 2 }),
  password: Joi.string().required().min(8),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});

export const signinSchema = Joi.object().keys({
  email: Joi.string().required().email({ minDomainSegments: 2 }),
  password: Joi.string().required().min(8),
});

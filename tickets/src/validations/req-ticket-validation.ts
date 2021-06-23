import Joi from "joi";

export const createTicketSchema = Joi.object().keys({
  title: Joi.string().required().min(8).alphanum(),
  price: Joi.number().required().positive(),
});

import Joi from "joi";

export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1),
  pageSize: Joi.number().integer().min(1),
});
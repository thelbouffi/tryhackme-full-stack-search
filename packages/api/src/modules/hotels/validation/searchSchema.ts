import Joi from "joi";

export const searchSchema = Joi.object({
  q: Joi.string()
    .regex(/^[a-zA-Z0-9\s]+$/)
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.pattern.base': 'Query parameter can only contain regular characters (letters, numbers, and spaces).',
      'string.empty': 'Search query q must be at least 1 characters long',
      "string.min": "Search query q must be at least 1 characters long",
      "string.max": "Search query q cannot be more than 50 characters long",
      "any.required": "Search query q is required",
    }),
});

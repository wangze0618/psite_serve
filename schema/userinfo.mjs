import Joi from "joi";

export const updateUserInfoRule = Joi.object({
  nickname: Joi.string().min(1).max(12).required(),
  email: Joi.string()
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required(),
  phone: Joi.string().length(11).required(),
  avatar: Joi.string().dataUri().required(),
  gender: Joi.string().length(1).required(),
  address: Joi.string().max(255),
});

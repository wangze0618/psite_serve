import Joi from "joi";

export const seKey = "wangze0618";
export const expTime = "36h";

// 用户注册检验
export const userRegistRule = Joi.object({
  username: Joi.string().alphanum().min(3).max(12).required(),
  password: Joi.string()
    .pattern(/^[\S]{6,12}$/)
    .required(),
});

// 用户登录检验
export const userLoginRule = Joi.object({
  username: Joi.string().alphanum().min(3).max(12).required(),
  password: Joi.string()
    .pattern(/^[\S]{6,12}$/)
    .required(),
});

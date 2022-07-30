// 用户路由模块
import express from "express";
const router = express.Router();
import { userLogin, userRegist } from "../router_handel/user.mjs";

// 1. 用户注册
router.post("/regist", userRegist);

// 2. 用户登录
router.post("/login", userLogin);
export default router;

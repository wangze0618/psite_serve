// 用户信息路由模块
import express from "express";
const router = express.Router();
import { updateUserInfo, userInfo } from "../router_handel/userinfo.mjs";

// 1. 获取用户基本信息
router.get("/userinfo", userInfo);

// 2. 更新用户基本信息
router.post("/userinfo", updateUserInfo);

export default router;

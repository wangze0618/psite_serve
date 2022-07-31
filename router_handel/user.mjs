import db from "../db/conn.mjs";
import {
  userLoginRule,
  userRegistRule,
  seKey,
  expTime,
} from "../schema/user.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 用户注册处理模块
export const userRegist = (req, res) => {
  const sql = `SELECT * FROM user WHERE username = ?`;
  const inSql = `INSERT INTO user SET ?`;
  // 1. 规则校验
  const { error, result } = userRegistRule.validate(req.body);
  if (error) {
    return res.cc(error.details[0].message);
  }
  db.query(sql, req.body.username, (err, sqlRes) => {
    if (err) {
      return res.cc(err);
    }
    if (sqlRes.length > 0) {
      return res.cc("用户名已被占用，请更换其他用户名！");
    }
    // 密码进行加密
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    db.query(inSql, req.body, (err, sqlRes) => {
      if (err) {
        return res.cc(err);
      }
      if (sqlRes.affectedRows !== 1) {
        return res.cc("注册用户失败，请重试！");
      }
      res.status(200).send({
        status: 0,
        message: "注册成功",
      });
    });
  });
};

// 用户登录处理模块
export const userLogin = (req, res) => {
  const info = req.body;
  const sql = `select * from user where username = ?`;
  // 1. 校验登录规则
  const { error, result } = userLoginRule.validate(info);
  if (error) {
    return res.cc(error.details[0].message);
  }
  db.query(sql, info.username, (err, sqlRes) => {
    if (err) {
      return res.cc(err);
    }
    if (sqlRes.length !== 1) {
      return res.cc("没有该账号");
    }
    // 比对密码
    if (bcrypt.compareSync(info.password, sqlRes[0].password)) {
      const userinfo = { ...sqlRes[0], avatar: "", password: "" };
      const token = jwt.sign(userinfo, seKey, {
        algorithm: "HS256",
        expiresIn: expTime,
      });
      res.send({
        status: 0,
        message: "登录成功",
        data: `Bearer ${token}`,
      });
    }
  });
};

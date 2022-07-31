import db from "../db/conn.mjs";
import { updateUserInfoRule } from "../schema/userinfo.mjs";

// 用户基本信息
export const userInfo = (req, res) => {
  const sql = `SELECT id,username,nickname,email,phone,avatar,gender,address FROM user WHERE id = ?`;
  db.query(sql, req.auth.id, (err, sqlRes) => {
    if (err) {
      return res.cc(err);
    }
    res.send({
      status: 0,
      message: "获取成功",
      data: sqlRes[0],
    });
  });
};

// 更新用户基本信息
export const updateUserInfo = (req, res) => {
  const sql = `UPDATE user SET ? WHERE id = ?`;
  const body = req.body;
  // 1. 校验规则
  const { error, result } = updateUserInfoRule.validate(body);
  if (error) {
    return res.cc(error.details[0].message);
  }
  db.query(sql, [body, req.auth.id], (err, sqlRes) => {
    if (err) {
      return res.cc(err);
    }
    if (sqlRes.affectedRows !== 1) {
      return res.cc("更新失败");
    }
    res.send({
      status: 0,
      message: "更新成功",
    });
  });
};

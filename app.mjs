import express from "express";
import cors from "cors";
import userRouter from "./router/user.mjs";
import userInfoRouter from "./router/userinfo.mjs";

import { expressjwt } from "express-jwt";
import { seKey } from "./schema/user.mjs";

const app = express();
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// [优化]封装res.send()报错
app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    return res.send({
      status, // 判断err是否是Error的实例，否则就返回
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// token校验
app.use(
  expressjwt({
    secret: seKey,
    algorithms: ["HS256"],
  }).unless({
    path: [/^\/api\//],
  })
);

app.use("/api", userRouter);
app.use("/my", userInfoRouter);

app.use((err, req, res, next) => {
  // token认证失败的错误
  if (err.name === "UnauthorizedError") {
    return res.cc("身份认证失败");
  }
  return res.cc("未知错误");
});

const port = 7000;
app.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});

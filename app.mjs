import express from "express";
import cors from "cors";
import userRouter from "./router/user.mjs";
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
app.use("/api", userRouter);

const port = 7000;
app.listen(port, () => {
  console.log(`running at http://localhost:${port}`);
});

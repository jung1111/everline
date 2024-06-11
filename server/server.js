import express from "express";
import cors from "cors";
import memberRouter from "./router/memberRouter.js";
import inquiryRouter from "./router/inquiryRouter.js";
import findRouter from "./router/findRouter.js";
import uploadRouter from "./router/uploadRouter.js";
import cartRouter from "./router/cartRouter.js";
import orderRouter from "./router/orderRouter.js";
import productRouter from "./router/productRouter.js";

import bodyParser from "body-parser";

const server = express();
const port = 8000;

// 미들웨어
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(bodyParser.json());
server.use("/uploads", express.static("uploads")); // 정적 파일 서비스

// 라우터
server.use("/member", memberRouter);
server.use("/member/FindAccount", findRouter);
server.use("/inquiry", inquiryRouter); // 1:1 문의
server.use("/upload", uploadRouter); // 업로드
server.use("/product", productRouter);
server.use("/carts", cartRouter);
server.use("/order", orderRouter);


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

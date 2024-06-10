import express from "express";
import cors from "cors";
import memberRouter from "./router/memberRouter.js";
import noticeRouter from "./router/noticeRouter.js";
import inquiryRouter from "./router/inquiryRouter.js";
import findRouter from "./router/findRouter.js";
import cartRouter from "./router/cartRouter.js";
import orderRouter from "./router/orderRouter.js";

import bodyParser from "body-parser";

const server = express();
const port = 8000;

//미들웨어
server.use(express.json());
server.use(express.urlencoded());
server.use(cors());
server.use(bodyParser.json());

//라우터
server.use("/member", memberRouter);
server.use("/member/FindAccount", findRouter);
server.use("/notice", noticeRouter); //공지사항
server.use("/inquiry", inquiryRouter); //1:1문의
server.use("/carts", cartRouter);
server.use("/order", orderRouter);

server.listen(port, () => {
  console.log(`server:: ${port}`);
});

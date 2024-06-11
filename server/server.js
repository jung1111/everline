import express from "express";
import cors from "cors";
import memberRouter from "./router/memberRouter.js";
import inquiryRouter from "./router/inquiryRouter.js";
import findRouter from "./router/findRouter.js";
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
server.use("/inquiry", inquiryRouter); //1:1문의

server.listen(port, () => {
  console.log(`server:: ${port}`);
});

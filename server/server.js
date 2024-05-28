import express from "express";
import cors from "cors";
import memberRouter from "./router/memberRouter.js";

const server = express();
const port = 8000;

/** 공통적인 요청 */
server.use(express.json());
server.use(express.urlencoded());
server.use(cors());

server.use("/member", memberRouter);

server.listen(port, () => {
  console.log(`wellcome everline ===>> ${port}`);
});

import express from 'express';
import cors from 'cors';
import noticeRouter from './router/noticeRouter.js';
import inquiryRouter from './router/inquiryRouter.js'

const server = express();
const port = 8000;

//미들웨어
server.use(express.json());
server.use(express.urlencoded());
server.use(cors());


//라우터
server.use('/notice', noticeRouter);//공지사항
server.use('/inquiry', inquiryRouter); //1:1문의


server.listen( port, ()=> {
	console.log(`server:: ${port}`);
})




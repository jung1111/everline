import express from "express";
import * as controller from "../controller/memberController.js";
const router = express.Router();

router.post("/login", controller.getLogin); // axios -> post
router.post("/idCheck", controller.getIdCheck);
router.post("/signup", controller.getSignup);
router.post("/findUserId", controller.findUserId);
router.post("/findUserPs", controller.findUserPs);
router.post("/send-auth-code", controller.sendAuthCode); // 새로운 경로 추가

export default router;

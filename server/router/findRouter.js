import express from "express";
import * as controller from "../controller/memberController.js";
const router = express.Router();

router.post("/findUserId", controller.findUserId);
router.post("/findUserPs", controller.findUserPs);
router.post("/send-auth-code", controller.sendAuthCode);
router.post("/updateUserPassword", controller.updateUserPassword);

export default router;

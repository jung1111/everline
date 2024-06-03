import express from "express";
import * as controller from "../controller/memberController.js";
const router = express.Router();

router.post("/login", controller.getLogin); // axios -> post
router.post("/idCheck", controller.getIdCheck);
router.post("/signup", controller.getSignup);
router.post("/findUserId", controller.findUserId);
export default router;

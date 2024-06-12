import express from "express";
import * as controller from "../controller/modifyController.js";
const router = express.Router();

router.get("/info", controller.getUserInfo);
router.put("/update", controller.updateUserInfo);

export default router;

import express from "express";
import * as controller from "../controller/orderController.js";
const router = express.Router();

router.get("/info", controller.getUserInfo);

export default router;

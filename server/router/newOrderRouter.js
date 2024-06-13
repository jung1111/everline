import express from "express";
import * as controller from "../controller/newOrderController.js";
const router = express.Router();

router.post("/create", controller.createNewOrder);
router.get("/info", controller.getNewOrders);
export default router;

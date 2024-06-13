import express from "express";
import * as controller from "../controller/orderController.js";
const router = express.Router();

router.get("/info", controller.getUserInfo);
router.get("/mileage", controller.getmilage);
router.post("/usemileage", controller.useMileage);
router.post("/stackmileage", controller.stackMileage);
export default router;

import express from "express";
import * as controller from "../controller/orderController.js";
const router = express.Router();

router.get("/info", controller.getUserInfo);
router.get("/mileage", controller.getMileage);
router.post("/usemileage", controller.useMileage);
router.post("/stackmileage", controller.stackMileage);
router.post("/placeOrder", controller.placeOrder); // 새로운 주문을 처리하는 라우터 추가
router.get("/getOrders", controller.getOrders); // 주문 내역을 가져오는 라우터 추가
router.get("/orderDetails", controller.getOrderDetails);
router.delete("/deleteOrder/:orderId", controller.deleteOrder);
export default router;

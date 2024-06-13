import express from "express";
import * as controller from "../controller/cartController.js";

const router = express.Router();

router.post("/", controller.getCarts);
router.post("/add", controller.addCartItem);
router.post("/count", controller.getCartCount);
router.post("/update", controller.updateCartItem);
router.post("/remove", controller.removeCartItem);
router.post("/deleteItems", controller.deleteItems);
export default router;

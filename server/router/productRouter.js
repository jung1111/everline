import express from "express";
import * as controller from "../controller/productController.js";
const router = express.Router();

router.post("/", controller.getProducts);
router.get("/:id", controller.getProduct);

export default router;

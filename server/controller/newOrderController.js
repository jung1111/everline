import * as repository from "../repository/newOrderRepository.js";

export const createNewOrder = async (req, res) => {
  const { userId, totalPrice, usedMileage, items } = req.body;
  const orderId = generateOrderId(); // 주문 ID 생성 로직 (랜덤한 15자리 문자열)
  try {
    await repository.createNewOrder({
      orderId,
      userId,
      totalPrice,
      usedMileage,
    });
    for (const item of items) {
      await repository.createNewOrderDetail({
        orderId,
        pid: item.pid,
        qty: item.qty,
        price: item.price,
      });
    }
    res.status(200).json({ success: true, orderId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const getNewOrders = async (req, res) => {
  const userId = req.query.USER_ID;
  try {
    const orders = await repository.getNewOrders(userId);
    for (const order of orders) {
      order.details = await repository.getNewOrderDetails(order.order_id);
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

import * as repository from "../repository/orderRepository.js";

export const getUserInfo = async (req, res) => {
  const userId = req.query.USER_ID;
  try {
    const user = await repository.getUserInfo(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};

export const getMileage = async (req, res) => {
  const userId = req.query.USER_ID;
  try {
    const mileage = await repository.getMileage(userId);
    res.status(200).json(mileage);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user mileage" });
  }
};

export const useMileage = async (req, res) => {
  const { USER_ID, usedMil } = req.body;
  try {
    const result = await repository.useMileage(USER_ID, usedMil);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user mileage" });
  }
};

export const stackMileage = async (req, res) => {
  const { USER_ID, stackMil } = req.body;
  try {
    const result = await repository.stackMileage(USER_ID, stackMil);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user mileage" });
  }
};

export const placeOrder = async (req, res) => {
  const { userId, items, total_price, used_mileage } = req.body;
  try {
    const result = await repository.placeOrder(
      userId,
      items,
      total_price,
      used_mileage
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
};

export const getOrders = async (req, res) => {
  const userId = req.query.USER_ID;
  try {
    const orders = await repository.getOrders(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
export const getOrderDetails = async (req, res) => {
  const orderId = req.query.orderId;
  try {
    const details = await repository.getOrderDetails(orderId);
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order details" });
  }
};
export const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const result = await repository.deleteOrder(orderId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};

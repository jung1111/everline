import * as repository from "../repository/cartRepository.js";

export const getCarts = async (req, res) => {
  const { userId } = req.body;
  const cartList = await repository.getCarts(userId);
  res.json(cartList);
};

export const addCartItem = async (req, res) => {
  const items = req.body;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "USER_ID is missing" });
  }
  if (!items || !items.pid) {
    return res.status(400).json({ error: "PID is missing" });
  }

  try {
    const result = await repository.addCartItem(items, userId);
    res.json(result);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

export const getCartCount = async (req, res) => {
  const { userId } = req.body;

  const result = await repository.getCartCount(userId);
  res.json(result);
};

export const updateCartItem = async (req, res) => {
  const { cid, newQty } = req.body;
  const result = await repository.updateCartItem({ cid, newQty });
  res.json({ success: result.affectedRows > 0 });
};

export const removeCartItem = async (req, res) => {
  const items = req.body.items;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "USER_ID is missing" });
  }

  try {
    for (const item of items) {
      await repository.removeCartItem(item.cid, userId);
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Error removing items from cart:", error);
    res.json({ success: false });
  }
};

export const deleteItems = async (req, res) => {
  const { userId, items } = req.body;
  try {
    const result = await repository.deleteItems(userId, items);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete items from cart" });
  }
};

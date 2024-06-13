import * as repository from "../repository/cartRepository.js";

export const getCarts = async (req, res) => {
  const cartList = await repository.getCarts(req.body);
  res.json(cartList);
};

export const addCartItem = async (req, res) => {
  const items = req.body;
  const result = await repository.addCartItem(items);
  res.json(result);
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
  try {
    for (const item of items) {
      await repository.removeCartItem(item.cid, item.userId);
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

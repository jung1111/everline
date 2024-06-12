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
  const { pid, userId } = req.body;
  const result = await repository.removeCartItem(pid, userId);
  res.json(result);
};

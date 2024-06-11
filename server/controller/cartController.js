import * as repository from "../repository/cartRepository.js";

export const getCarts = async (req, res) => {
  const userId = req.body.userId || "test"; // 기본값을 "test"로 설정
  try {
    const cartList = await repository.getCarts(userId);
    res.json(cartList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCartItem = async (req, res) => {
  const { userId = "test", pid, qty } = req.body; // 기본값을 "test"로 설정
  try {
    const result = await repository.addCartItem({ userId, pid, qty });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCartCount = async (req, res) => {
  const { userId = "test" } = req.body; // 기본값을 "test"로 설정
  try {
    const count = await repository.getCartCount(userId);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  const { userId = "test", pid, qty } = req.body; // 기본값을 "test"로 설정
  try {
    const result = await repository.updateCartItem({ userId, pid, qty });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeCartItem = async (req, res) => {
  const { userId = "test", pid } = req.body; // 기본값을 "test"로 설정
  try {
    const result = await repository.removeCartItem(userId, pid);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import * as repository from "../repository/cartRepository.js";

export const getCarts = async (req, res) => {
  const cartList = await repository.getCarts(req.body);
  res.json(cartList);
};

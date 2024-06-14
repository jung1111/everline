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

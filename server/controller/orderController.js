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

export const getmilage = async (req, res) => {
  const userId = req.query.USER_ID;
  try {
    const mileage = await repository.getmilage(userId);
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

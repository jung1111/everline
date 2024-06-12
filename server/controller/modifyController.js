import { getUserById, updateUser } from "../repository/modifyRepository.js";

export const getUserInfo = async (req, res) => {
  const userId = req.query.USER_ID;
  try {
    const user = await getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};

export const updateUserInfo = async (req, res) => {
  const user = req.body;
  try {
    const result = await updateUser(user);
    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to update user info" });
  }
};

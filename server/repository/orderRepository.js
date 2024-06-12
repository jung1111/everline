import { db } from "../db/database_mysql.js";

export const getUserInfo = async (userId) => {
  const [rows] = await db.query("SELECT * FROM ever_member WHERE USER_ID = ?", [
    userId,
  ]);
  return rows[0];
};

import { db } from "../db/database_mysql.js";

export const getUserById = async (userId) => {
  const [rows] = await db.query("SELECT * FROM ever_member WHERE USER_ID = ?", [
    userId,
  ]);
  return rows[0];
};

export const updateUser = async (user) => {
  const { USER_ID, USER_NAME, MOBILE_NUMBER, EMAIL_ID, ZIPCODE, ADDRESS } =
    user;
  await db.query(
    "UPDATE ever_member SET USER_NAME = ?, MOBILE_NUMBER = ?, EMAIL_ID = ?, ZIPCODE = ?, ADDRESS = ? WHERE USER_ID = ?",
    [USER_NAME, MOBILE_NUMBER, EMAIL_ID, ZIPCODE, ADDRESS, USER_ID]
  );
};

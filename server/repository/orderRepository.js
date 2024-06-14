import { db } from "../db/database_mysql.js";

export const getUserInfo = async (userId) => {
  const [rows] = await db.query("SELECT * FROM ever_member WHERE USER_ID = ?", [
    userId,
  ]);
  return rows[0];
};

export const getmilage = async (userId) => {
  const [rows] = await db.query(
    "SELECT mil FROM ever_mileage WHERE USER_ID = ?",
    [userId]
  );
  return rows[0];
};

export const useMileage = async (userId, usedMil) => {
  const [result] = await db.query(
    `
    UPDATE ever_mileage 
    SET mil = mil - ? 
    WHERE USER_ID = ? 
    `,
    [usedMil, userId]
  );
  return result;
};

export const stackMileage = async (userId, stackMil) => {
  const [result] = await db.query(
    `
    UPDATE ever_mileage 
    SET mil = mil + ? 
    WHERE USER_ID = ? 
    `,
    [stackMil, userId]
  );
  return result;
};

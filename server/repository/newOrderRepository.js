import { db } from "../db/database_mysql.js";

export const getUserInfo = async (userId) => {
  const [rows] = await db.query("SELECT * FROM ever_member WHERE USER_ID = ?", [
    userId,
  ]);
  return rows[0];
};

export const getMileage = async (userId) => {
  const [rows] = await db.query(
    "SELECT mil FROM ever_mileage WHERE USER_ID = ?",
    [userId]
  );
  return rows[0];
};

export const useMileage = async (userId, usedMil) => {
  const [result] = await db.query(
    "UPDATE ever_mileage SET mil = mil - ? WHERE USER_ID = ?",
    [usedMil, userId]
  );
  return result;
};

export const stackMileage = async (userId, stackMil) => {
  const [result] = await db.query(
    "UPDATE ever_mileage SET mil = mil + ? WHERE USER_ID = ?",
    [stackMil, userId]
  );
  return result;
};

export const placeOrder = async (userId, items, total_price, used_mileage) => {
  const orderId = generateOrderId();
  const conn = await db.getConnection();
  await conn.beginTransaction();

  try {
    await conn.query(
      "INSERT INTO ever_order (order_id, user_id, total_price, used_mileage) VALUES (?, ?, ?, ?)",
      [orderId, userId, total_price, used_mileage]
    );

    for (const item of items) {
      await conn.query(
        "INSERT INTO ever_order_detail (order_id, pid, qty, price) VALUES (?, ?, ?, ?)",
        [orderId, item.pid, item.qty, item.price]
      );
    }

    await conn.commit();
    conn.release();
    return { orderId };
  } catch (error) {
    await conn.rollback();
    conn.release();
    throw error;
  }
};

function generateOrderId() {
  return Math.random().toString(36).substr(2, 15);
}

import { db } from "../db/database_mysql.js";

export const getCarts = async (userId) => {
  const sql = `
    SELECT c.cid, c.user_id, c.pid, c.qty, c.cdate, p.ptitle as title, p.price, p.image 
    FROM ever_cart c 
    JOIN ever_product p ON c.pid = p.pid 
    WHERE c.user_id = ?
  `;

  return db.execute(sql, [userId]).then((result) => result[0]);
};

export const addCartItem = async (item) => {
  if (!item.userId || !item.pid) {
    throw new Error("Invalid parameters");
  }

  const sqlCheck = `SELECT COUNT(*) as count FROM ever_cart WHERE user_id = ? AND pid = ?`;
  const [rows] = await db.execute(sqlCheck, [item.userId, item.pid]);

  if (rows[0].count > 0) {
    const sqlUpdate = `UPDATE ever_cart SET qty = qty + 1 WHERE user_id = ? AND pid = ?`;
    const [result] = await db.execute(sqlUpdate, [item.userId, item.pid]);
    return result;
  } else {
    const sqlInsert = `INSERT INTO ever_cart (user_id, pid, qty, cdate) VALUES (?, ?, ?, ?)`;
    const [result] = await db.execute(sqlInsert, [
      item.userId,
      item.pid,
      item.qty || 1,
      new Date(),
    ]);
    return result;
  }
};

export const getCartCount = async (userId) => {
  const sql = `SELECT COUNT(*) as count FROM ever_cart WHERE user_id = ?`;
  const [rows] = await db.execute(sql, [userId]);
  return rows[0].count;
};

export const updateCartItem = async (item) => {
  if (!item.userId || !item.pid || item.qty === undefined) {
    throw new Error("Invalid parameters");
  }

  const sql = `UPDATE ever_cart SET qty = ? WHERE user_id = ? AND pid = ?`;
  const [result] = await db.execute(sql, [item.qty, item.userId, item.pid]);
  return result;
};

export const removeCartItem = async (userId, pid) => {
  if (!userId || !pid) {
    throw new Error("Invalid parameters");
  }

  const sql = `DELETE FROM ever_cart WHERE user_id = ? AND pid = ?`;
  const [result] = await db.execute(sql, [userId, pid]);
  return result;
};

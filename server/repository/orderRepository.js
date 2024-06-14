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

export const placeOrder = async (userId, items, total_price, used_mileage) => {
  const orderId = generateOrderId();
  const odate = new Date();
  await db.query(
    "INSERT INTO ever_order (order_id, odate, user_id, total_price, used_mileage) VALUES (?, ?, ?, ?, ?)",
    [orderId, odate, userId, total_price, used_mileage]
  );

  for (const item of items) {
    await db.query(
      "INSERT INTO ever_order_detail (order_id, pid, qty, price) VALUES (?, ?, ?, ?)",
      [orderId, item.pid, item.qty, item.price]
    );
  }
  return { orderId, odate, userId, total_price, used_mileage };
};

export const getOrders = async (userId) => {
  const [rows] = await db.query(
    `SELECT o.order_id, o.odate, o.total_price, o.used_mileage 
    FROM ever_order o
    WHERE o.user_id = ?
    ORDER BY o.odate DESC`, // 주문 날짜 기준으로 내림차순 정렬
    [userId]
  );
  return rows;
};

export const getOrderDetails = async (orderId) => {
  const [rows] = await db.query(
    `SELECT od.*, p.ptitle, p.image
     FROM ever_order_detail od
     JOIN ever_product p ON od.pid = p.pid
     WHERE od.order_id = ?`,
    [orderId]
  );
  return rows;
};

export const deleteOrder = async (orderId) => {
  // 트랜잭션 시작
  await db.query("START TRANSACTION");

  try {
    // 주문 상세 내역 삭제
    await db.query(`DELETE FROM ever_order_detail WHERE order_id = ?`, [
      orderId,
    ]);

    // 주문 삭제
    await db.query(`DELETE FROM ever_order WHERE order_id = ?`, [orderId]);

    // 트랜잭션 커밋
    await db.query("COMMIT");

    return { success: true };
  } catch (error) {
    // 트랜잭션 롤백
    await db.query("ROLLBACK");
    throw error;
  }
};

const generateOrderId = () => {
  return Math.random().toString(36).substring(2, 11).toUpperCase();
};

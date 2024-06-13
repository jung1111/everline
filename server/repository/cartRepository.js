import { db } from "../db/database_mysql.js";

export const getCarts = async () => {
  const sql = `
    SELECT   ec.cid, ec.pid, ec.qty, ec.cdate, ep.ptitle as title, ep.price, ep.image 
    FROM ever_cart ec,ever_product ep
    WHERE ep.pid = ec.pid
  `;

  return db.execute(sql).then((result) => result[0]);
};

const cartCheck = async (items) => {
  const sql = `
  SELECT COUNT(cid) cnt, cid FROM ever_cart 
  WHERE pid = ? 
  GROUP BY cid
  `;
  if (!items.pid) {
    throw new Error("items.pid is undefined");
  }
  return db.execute(sql, [items.pid]).then((result) => result[0][0]); // {cnt: 1, cid : 9}
};

export const addCartItem = async (items) => {
  if (!items.pid) {
    throw new Error("items.pid is undefined");
  }

  const checkResult = await cartCheck(items);
  let result_rows = 0;
  let sql = ``;

  if (checkResult === undefined) {
    // insert
    sql = `
    INSERT INTO ever_cart (pid, cdate, user_id)
    VALUES (?, now(), 'test')
    `;
    const [result] = await db.execute(sql, [items.pid]);
    result_rows = result.affectedRows;
  } else {
    // update
    sql = `
    UPDATE ever_cart 
    SET qty = qty + 1
    WHERE cid = ?
    `;
    const [result] = await db.execute(sql, [checkResult.cid]);
    result_rows = result.affectedRows;
  }

  return { cnt: result_rows };
};

export const getCartCount = async (userId) => {
  const sql = `SELECT COUNT(CID) count FROM ever_cart
  where user_id = ?`;

  return db.execute(sql, [userId]).then((result) => result[0][0]);
};

export const updateCartItem = async (item) => {
  const sql = `UPDATE ever_cart SET qty = ? WHERE cid = ?`;
  const [result] = await db.execute(sql, [item.newQty, item.cid]);
  return { affectedRows: result.affectedRows };
};

export const removeCartItem = async (cid, userId) => {
  const sql = `DELETE FROM ever_cart WHERE cid = ? AND user_id = ?`;
  const [result] = await db.execute(sql, [cid, userId]);
  return { affectedRows: result.affectedRows };
};

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
  select count(cid) cnt, cid from ever_cart 
	where pid = ? 
    group by cid
  `;

  return db.execute(sql, [items.pid]).then((result) => result[0][0]); // {cnt: 1, cid : 9}
};

export const addCartItem = async (items) => {
  // cartCheck 함수를 통해 pid
  const checkResult = await cartCheck(items);
  let result_rows = 0;
  let sql = ``;

  if (checkResult === null) {
    // insert
    sql = `
    insert into ever_cart( pid, cdate, user_id )
    values ( ?, now(), ?)
    `;
    const [result] = await db.execute(sql, [items.pid]);
    result_rows = result.affectedRows;
  } else {
    // update
    sql = `
    update ever_cart 
        set qty = qty + 1
        where cid = ? 
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

export const removeCartItem = async (pid, userId) => {
  userId = "test";
  const sql = `DELETE FROM ever_cart WHERE PID = ? and user_id = ?`;
  const [result] = await db.execute(sql, [pid, userId]);
  return { affectedRows: result.affectedRows };
};

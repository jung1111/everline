import { db } from "../db/database_mysql.js";

export const getProducts = async (params) => {
  const sql = `
    SELECT pid AS id, ptitle AS title, price, image 
    FROM ever_product
  `;

  return db.execute(sql).then((result) => result[0]);
};

/* 개별상품 */
export const getProduct = async (id) => {
  const sql = `
    SELECT pid AS id, ptitle AS title, price, DATE_FORMAT(period, '%Y-%m-%d') AS period, image, info_image AS detailimage 
    FROM ever_product 
    WHERE pid = ?
  `;

  return db.execute(sql, [id]).then((result) => result[0][0]);
};

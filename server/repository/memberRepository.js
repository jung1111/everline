import { db } from "../db/database_mysql.js";
import bcrypt from "bcryptjs";

/* ps 변경 */

export const updateUserPassword = async (email, newPassword) => {
  if (!email || !newPassword) {
    console.log(email, newPassword);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const sql = `
    UPDATE ever_member
    SET USER_PASS = ?
    WHERE CONCAT(email_id, '@', email_domain) = ?
  `;

  try {
    const [result] = await db.execute(sql, [hashedPassword, email]);
    return result;
  } catch (error) {
    throw error; // 데이터베이스 실행 오류를 상위 수준으로 던집니다.
  }
};

export const findUserByEmail = async (email) => {
  const query = `
    SELECT * FROM ever_member
    WHERE CONCAT(email_id, '@', email_domain) = ?
  `;
  try {
    const results = await db.query(query, [email]);
    return results[0]; // 찾은 첫 번째 결과를 반환합니다. 이메일이 고유하다고 가정합니다.
  } catch (error) {
    throw error; // 에러를 상위 수준에서 처리할 수 있도록 throw
  }
};

/* ps 찾기 */
export const findUserPs = async (userId, userName) => {
  let info_result = 0;
  const sql = `
  SELECT COUNT(*) as count FROM EVER_MEMBER WHERE USER_NAME = ? AND USER_ID = ?
  `;
  const emailSql = `
  SELECT CONCAT(email_id, '@', email_domain) AS email 
  FROM EVER_MEMBER 
  WHERE USER_NAME = ? AND USER_ID = ?
  `;

  try {
    const [result] = await db.execute(sql, [userName, userId]);
    info_result = result[0].count;

    if (info_result === 1) {
      const [emailResult] = await db.execute(emailSql, [userName, userId]);
      const email = emailResult[0].email;

      console.log("User ID found:", userId); // 사용자 ID를 로그에 출력합니다.
      return { cnt: info_result, email, userId, userName }; // 사용자 ID와 결과를 반환합니다.
    }
  } catch (error) {
    console.error(error);
    throw error;
  }

  return { cnt: info_result }; // 결과 행의 수를 반환합니다.
};

/* id 찾기 */

export const findUserId = async (userName, mobileNumber1, mobileNumber2) => {
  let result_rows = 0;

  // mobileNumber2가 undefined일 경우 빈 문자열로 설정합니다.
  mobileNumber2 = mobileNumber2 || "";

  let mobile2 = "";
  let mobile3 = "";
  if (mobileNumber2.length === 8) {
    mobile2 = mobileNumber2.slice(0, 4);
    mobile3 = mobileNumber2.slice(4);
  } else {
    mobile2 = mobileNumber2.slice(0, 3);
    mobile3 = mobileNumber2.slice(3);
  }

  const phoneNumber = `${mobileNumber1}-${mobile2}-${mobile3}`;

  const sql = `
    SELECT USER_ID FROM EVER_MEMBER WHERE USER_NAME = ? AND MOBILE_NUMBER = ?  
  `;

  try {
    const [result] = await db.execute(sql, [userName, phoneNumber]);
    result_rows = result.length;
    console.log("rows", result.length);

    if (result_rows === 1) {
      const userId = result[0].USER_ID;
      console.log("User ID found:", userId);
      return { userId, userName };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  return { cnt: result_rows };
};

/** login처리 */

export const getLogin = async (userId, userPass) => {
  let login_result = 0;
  const sql = `
    SELECT COUNT(user_id) AS cnt, 
           ANY_VALUE(user_pass) AS user_pass 
    FROM ever_member
    WHERE user_id = ?
  `;

  try {
    const [rows] = await db.execute(sql, [userId]);
    const result = rows[0];
    console.log("result----->", result);

    if (result.cnt === 1) {
      const isPasswordCorrect = bcrypt.compareSync(userPass, result.user_pass);
      if (isPasswordCorrect) {
        login_result = 1;
      }
    }
  } catch (error) {
    console.error("Error login:", error);
  }

  return { cnt: login_result };
};

/* id check */
export const getIdCheck = async (userId) => {
  const sql = `
  select count(user_id) cnt from ever_member where user_id = ?
  `;

  return db.execute(sql, [userId]).then((result) => result[0][0]);
};

/* sign up */
export const getSignup = async (formData) => {
  let result_rows = 0;
  console.log("formData", formData);

  const mobile1 = formData.mobileNumber1;
  let mobile2 = "";
  let mobile3 = "";
  if (formData.mobileNumber2.length == 8) {
    mobile2 = formData.mobileNumber2.slice(0, 4);
    mobile3 = formData.mobileNumber2.slice(4);
  } else {
    mobile2 = formData.mobileNumber2.slice(0, 3);
    mobile3 = formData.mobileNumber2.slice(3);
  }

  const sql = `
  insert into ever_member(
    USER_ID,
    USER_PASS,
    USER_NAME,
    MOBILE_NUMBER,
    EMAIL_ID,
    EMAIL_DOMAIN,
    ZIPCODE,
    ADDRESS,
    SIGNUP_DATE
  )
  values(?,?,?,?,?,?,?,?,now())
  `;
  const params = [
    formData.userId,
    bcrypt.hashSync(formData.userPass, 7),
    formData.userName,
    mobile1.concat("-", mobile2, "-", mobile3),
    formData.emailId,
    formData.emailDomain,
    formData.zipcode,
    formData.address.concat(" ", formData.detailAddress),
  ];
  try {
    const [result] = await db.execute(sql, params);
    result_rows = result.affectedRows;
    console.log("rows", result.affectedRows);
  } catch (error) {
    console.log(error);
  }

  return { cnt: result_rows };
};

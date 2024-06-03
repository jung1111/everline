import { db } from "../db/database_mysql.js";
import bcrypt from "bcryptjs";

export const findUserId = async (userName, mobileNumber1, mobileNumber2) => {
  let result_rows = 0; // 초기값을 설정합니다.

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
    const [result] = await db.execute(sql, [userName, phoneNumber]); // prepared statement를 사용하여 SQL 쿼리를 실행합니다.
    result_rows = result.length; // 결과 행의 수를 가져옵니다.
    console.log("rows", result.length); // 결과 행의 수를 로그에 출력합니다.

    if (result_rows === 1) {
      // 결과 행의 수가 1이면서 사용자 ID가 존재하는 경우
      const userId = result[0].USER_ID;
      console.log("User ID found:", userId); // 사용자 ID를 로그에 출력합니다.
      return { userId, userName }; // 사용자 ID를 반환합니다.
    }
  } catch (error) {
    console.log(error); // 에러가 발생하면 로그에 에러를 출력합니다.
    throw error; // 에러를 다시 던집니다.
  }

  return { cnt: result_rows }; // 결과 행의 수를 반환합니다.
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

/* login처리 */
import { db } from "../db/database_mysql.js";



export const getLogin = (userId, userPass) => {
  // did(DB id) = test, dpass =1234
  const did = "test";
  const dpass = "1234";
  const result = {};

  //패스워드 체크 후 숫자로 결과 전송
  // 로그인 성공 : {cnt:1}
  // 로그인 실패 : {cnt:0}
  if (did === userId && dpass === userPass) {
    result.cnt = 1;
  } else {
    result.cnt = 0;
  }
  console.log("result", result);
  return result;
};

/* id check */
export const getIdCheck = (userId) => {
  const did = "test";
  const result = {};
  if (did === userId) {
    result.cnt = 1; // 이미 있는 id
  } else {
    result.cnt = 0; //사용가능
  }
  return result;
};

/* sign up */
export const getSignup = (formData) => {
  console.log("formData", formData);
  return { cnt: 1 };
};

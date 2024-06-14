import { getCookie, removeCookie } from "./cookies.js";

export const getUser = () => {
  let userInfo =
    localStorage.getItem("userInfo") && getCookie("x-auth-jwt")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
  console.log("getUser: userInfo =", userInfo); // 추가된 콘솔 로그

  return userInfo;
};

export const removeUser = () => {
  removeCookie("x-auth-jwt");
  localStorage.clear();
};

import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  // cookie에 token 저장
  return cookies.set(name, value, option);
};

export const getCookie = (name) => {
  // cookie 가져다 사용 get
  return cookies.get(name);
};

export const removeCookie = (name) => {
  // 삭제시 remove
  return cookies.remove(name);
};

import React from "react";
import { Link } from "react-router-dom";

export default function SubMenu({ menu, src }) {
  //클릭이벤트 - on일때 color:red로 변경하기

  return (
    <li>
      <Link to={src}>{menu}</Link>
    </li>
  );
}

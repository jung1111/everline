import React from "react";
import { Link } from "react-router-dom";

export default function SubMenu({ menu, src }) {
  return (
    <li>
      <Link to={src}>{menu}</Link>
    </li>
  );
}

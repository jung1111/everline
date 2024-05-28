import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProductPage() {
  const [productlist, setProductList] = useState([]);
  useEffect(() => {
    axios
      .get("/data/product.json")
      .then((res) => setProductList(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="container">
      <div className="content">
        <div className="content_breadcrumb">
          <Link to="/" className="breadcrumb_home"></Link>
          <span>&nbsp;&nbsp;PRODUCT</span>
        </div>
        <div className="content_area">
          <div className="content_title">
            <h1>PRODUCT</h1>
          </div>
          <div className="content_category">
            <ul>
              <li>
                <Link to="">
                  <span className="category_title">EVER MUSIC</span>
                </Link>
              </li>
              <li>
                <Link to="">
                  <span className="category_title">EVER MD</span>
                </Link>
              </li>
              <li>
                <Link to="">
                  <span className="category_title">EVER CON</span>
                </Link>
              </li>
              <li>
                <Link to="">
                  <span className="category_title">EVER FRIENDS</span>
                </Link>
              </li>
              <li>
                <Link to="">
                  <span className="category_title">EVER LIGHT STICK</span>
                </Link>
              </li>
              <li>
                <Link to="">
                  <span className="category_title">SALE</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="products">
            <ul className="product_list">
              {productlist.map((product) => (
                <li className="product">
                  <div className="product_imgbox">
                    <Link to={`/detail/${product.id}`}>
                      <img className="product_img" src={product.image} />
                    </Link>
                  </div>
                  <div className="product_info">
                    <span className="product_title">{product.title}</span>
                    <span className="product_price">
                      {product.price?.toLocaleString()}원
                    </span>
                    <span className="product_soldout">품절</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

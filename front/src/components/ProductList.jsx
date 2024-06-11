import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({ rows }) => {
  return (
    <div>
      {rows.map((row, index) => (
        <ul className="ProductPage" key={index}>
          {row.map((product) => (
            <li key={product.id}>
              <div className="ProductPage-img-box">
                <Link to={`/product/${product.id}`}>
                  <img
                    className="ProductPage-img"
                    src={`http://localhost:8000/${product.image}`}
                    alt={product.title}
                  />
                </Link>
              </div>
              <div className="ProductPage-info">
                <span className="ProductPage-title">{product.title}</span>
                <span className="ProductPage-price">
                  {product.price.toLocaleString()}원
                </span>
                <span className="ProductPage-soldout">품절</span>
              </div>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default ProductList;

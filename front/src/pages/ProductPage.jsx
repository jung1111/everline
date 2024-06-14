import "../css/product.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Location from "../components/Location";
import SubTitle from "../components/SubTitle";
import ListAll from "../components/ListAll";
import ProductList from "../components/ProductList";
import ScrollUp from "../components/ScrollUp";

export default function ProductPage() {
  const [productlist, setProductList] = useState([]);
  const selectList = [
    { value: "popularity", title: "이름순" },
    { value: "highpricestitle", title: "높은가격순" },
    { value: "lospricestitle", title: "낮은가격순" },
  ];

  useEffect(() => {
    const url = "http://192.168.50.76:8000/product";
    axios
      .post(url)
      .then((res) => setProductList(res.data))
      .catch((error) => console.log(error));
  }, []);

  const rows = [];
  for (let i = 0; i < productlist.length; i += 4) {
    rows.push(productlist.slice(i, i + 4));
  }

  // 필터
  const handleChange = (e) => {
    let clickList = e.target.value;
    let sortEvent = [...productlist];

    if (clickList === selectList[0].value) {
      sortEvent.sort((a, b) => a.title.localeCompare(b.title));
    } else if (clickList === selectList[1].value) {
      sortEvent.sort((a, b) => b.price - a.price);
    } else if (clickList === selectList[2].value) {
      sortEvent.sort((a, b) => a.price - b.price);
    }
    setProductList(sortEvent);
  };
  return (
    <div className="content">
      <Location depth1="PRODUCT" />
      <SubTitle title="PRODUCT" />
      <ListAll
        eventList={productlist}
        handleChange={handleChange}
        selectList={selectList}
      />
      <ProductList rows={rows} />
      <ScrollUp />
    </div>
  );
}

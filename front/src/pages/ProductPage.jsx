import '../css/product.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import ListAll from '../components/ListAll';


export default function ProductPage({menu}) {
  const [productlist, setProductList] = useState([])
  const selectList = [
    {"value": "popularity", "title": "이름순"},
    {"value": "highpricestitle","title" : "높은가격순"},
    {"value": "lospricestitle", "title" : "낮은가격순"}
    ];

  useEffect(() => {
    axios
      .get('/data/product.json')
      .then(res => setProductList(res.data))
      .catch(error => console.log(error))
  }, [])

  const rows = [];
  for(let i = 0; i < productlist.length; i += 4) {
    rows.push(productlist.slice(i,i+4))
  }

// 필터
const handleChange = (e) => {
  let clickList = e.target.value;
  let event = [...productlist]

  if(clickList === selectList[0].value){
    let popularity = event;
    popularity.sort((a, b)=>{
      if(a.name > b.name) return 1;
      if(a.name < b.name) return -1;
      return 0;
    })
    setProductList(popularity);
  }else if(clickList === selectList[1].value){
    let highpricestitle = event;
    highpricestitle.sort((a, b)=>{
      if(a.price > b.price) return 1;
      if(a.price < b.price) return -1;
      return 0;
    })
    setProductList(highpricestitle);
  }else if(clickList === selectList[2].value){
    let lospricestitle = event;
    lospricestitle.sort((a, b)=>{
      if(a.price < b.price) return 1;
      if(a.price > b.price) return -1;
      return 0;
    })
    setProductList(lospricestitle);
  }

}
  return (
      <div className='content'>
			<Location depth1="PRODUCT"/>
			<SubTitle title="PRODUCT"/>
      <ListAll eventList={productlist} handleChange={handleChange} selectList={selectList}/>
      {
				rows.map((row, index)=>(
					<ul className='ProductPage' key={index}>
					{
						row.map((product)=>(
							<li>
								<div className='ProductPage-img-box'>
									<Link to={`/detail/${product.id}`}>
                    <img className='ProductPage-img' src={product.image} />
                  </Link>
								</div>
                <div className='ProductPage-info'>
                  <span className='ProductPage-title'>{product.title}</span>
                  <span className='ProductPage-price'>{product.price}</span>
                  <span className="ProductPage-soldout">품절</span>
                </div>
							</li>
						))
					}					
			</ul>
				))
			}
          </div>
  )
}
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Location from '../components/Location';
import SubTitle from '../components/SubTitle';
import ListAll from '../components/ListAll';


export default function ProductPage({menu}) {
  const [productlist, setProductList] = useState([])
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

  return (
      <div className='content'>
			<Location depth1="PRODUCT"/>
			<SubTitle title="PRODUCT"/>
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
            {/* <ul className='product_list'>
              {productlist.map(product => (
                <li className='product'>
                  <div className='product_imgbox'>
                    <Link to={`/detail/${product.id}`}>
                      <img className='product_img' src={product.image} />
                    </Link>
                  </div>
                  <div className='product_info'>
                    <span className='product_title'>{product.title}</span>
                    <span className='product_price'>{product.price}</span>
                    <span className="product_soldout">품절</span>
                  </div>
                </li>
              ))}
            </ul> */}
          </div>
  )
}
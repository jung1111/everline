import '../css/product.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';

const MainSub = ({ mainsub_title1, mainsub_title2, target }) => {
    
    const [productlist, setProductList] = useState([]);

    useEffect(() => {
    axios
    .get('/data/product.json')
    .then(res => {
        const filteredProducts = res.data.filter(product => product.category === target);
        setProductList(filteredProducts);
    })
    .catch(error => console.log(error));
    }, [target]);

    const rows = [];
    for (let i = 0; i < productlist.length; i += 3) {
    rows.push(productlist.slice(i, 3));
    }

    return (
    <div className='newrelease'>
        <span>
            <h2>{mainsub_title1}</h2>
            <h2>{mainsub_title2}</h2>
            <button className="release-prev"></button>
            <button className="release-next"></button>
        </span>
        <div className="newrelease-product">
            <ProductList rows={rows}  />
        </div>
    </div>
    );
};

export default MainSub;
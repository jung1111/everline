import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductDetailCustomer  () {

    return (
        <div className='productDetatil-customer'>
            <h6>문의사항 있으신가요?</h6>
            <p>1:1 문의를 통해 질문을 남겨주시면 친절히 답변 드리겠습니다.</p>
            <Link to="/inquiry"><button className='customer-btn' type="button">1:1문의 남기기</button></Link>
        </div>
    )

}
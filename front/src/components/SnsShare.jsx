import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";




export default function SnsShare() {
    const [moreview, setMoreview] = useState(false);
    const Click = () => {
      setMoreview(!moreview);
    };
    
    return(
        <div className="sns" onClick={Click}>
                <span><FontAwesomeIcon icon={faCodeBranch} className='codebranch' size='1x'/>SNS공유하기</span>
                <span>{moreview ? (<div className="sns_btn1"></div>) : (<div className="sns_btn2"></div>)}</span>
                {moreview && (
                    <div className='sns-contnt'>
                        <p>SNS공유하기</p>
                        <div className='sns-box'>
                            <div className='sns-logo-box'>
                                <Link to="https://www.facebook.com/?locale=ko_KR"><img className='sns-logo' src="../images/sns-facebook.png" alt="" /></Link>
                                <div>페이스북</div>
                            </div>
                            <div className='sns-logo-box'>
                                <Link to="https://x.com/?lang=ko"><img className='sns-logo' src="../images/sns-twitter.png" alt="" /></Link>
                                <div>트위터</div>
                            </div>
                            <div className='sns-logo-box'>
                                <Link to="https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fstory.kakao.com%252Fs%252Foauth%26state%3D6f8016ffe976a%26through_account%3Dtrue%26client_id%3D2a8b2aa0dc2c4e9121bbd4b9bdb70bc1#login"><img className='sns-logo' src="../images/sns-kakaostory.png" alt="" /></Link>
                                <div>카카오스토리</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
    )
}
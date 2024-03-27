import React from 'react';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

function Navigation() {
    const navi = useNavigate();
    const [,,removeCookie] = useCookies();
    const indexBtnHandler = () => {
        navi('/');
        removeCookie('coinUuid')
    }
    const coinChatBtnHandler = () => {
        navi('/main');
    }
    return (
        <div className='navigation'>
            <h1 className="">
                Coin
                <span className="naviSpan">
                    <span>AI</span>
                </span>
            </h1>
            <div className='naviBtn'>
                <button className='indexBtn' onClick={indexBtnHandler}>Index</button>
                <p>|</p>
                <button className='coinChatBtn' onClick={coinChatBtnHandler}>Coin Chat</button>
            </div>
            <div className='naviBtn' style={{width: '9%'}}>
                <p>Login</p>
            </div>
        </div>
    );
}

export default Navigation;

import React from 'react';

function Navigation() {
    return (
        <div className='navigation'>
            <h1 className="">
                Coin
                <span className="naviSpan">
                    <span>AI</span>
                </span>
            </h1>
            <div className='naviBtn'>
                <button className='indexBtn'>Index</button>
                <p>|</p>
                <button className='coinChatBtn'>Coin Chat</button>
            </div>
            <div className='naviBtn' style={{width: '9%'}}>
                <p>Login</p>
            </div>
        </div>
    );
}

export default Navigation;

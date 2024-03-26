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
                <p style={{marginRight: '10px'}}>Index</p>
                <p>|</p>
                <p style={{marginLeft: '10px'}}>Coin Chat</p>
            </div>
            <div className='naviBtn' style={{width: '9%'}}>
                <p>Login</p>
            </div>
        </div>
    );
}

export default Navigation;

import React from 'react';
import Coins from "../typs/coins";
import './IndexRow.css'
function IndexRow({change, iconUrl, symbol, uuid, price, name, sparkline, rank}: Coins) {

    return (
        <div className='indexRow'>
            <img className='icon' src={iconUrl}/>
            <p>{name}</p>
            <p>{change}</p>
            <p>{price}</p>
            <p>{symbol}</p>
            <p>{rank}</p>
        </div>
    );
}

export default IndexRow;

import React from 'react';
import Coins from "../typs/coins";
import './IndexRow.css'
import styled from "styled-components";

const PositiveP = styled.p`
    width: 10%;
    color: red;
`;
const NegativeP = styled.p`
    width: 10%;
    color: blue;
`;
function IndexRow({change, iconUrl, symbol, uuid, price, name, sparkline, rank}: Coins) {

    return (
        <div className='indexRow'>
            <img className='icon' src={iconUrl}/>
            <p style={{width: '15%'}}>{name}</p>
            {change > 0 ? <PositiveP>{change}</PositiveP> : <NegativeP>{change}</NegativeP>}
            <p style={{width: '20%'}}>{price}</p>
            <p style={{width: '10%'}}>{symbol}</p>
            <p style={{width: '2%'}}>{rank}</p>
        </div>
    );
}

export default IndexRow;

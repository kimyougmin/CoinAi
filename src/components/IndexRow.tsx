import React from 'react';
import Coins from "../typs/Coins";
import './IndexRow.css'
import styled from "styled-components";
import {useCookies} from "react-cookie";

const PositiveP = styled.p`
    width: 30%;
    color: red;
`;
const NegativeP = styled.p`
    width: 30%;
    color: blue;
`;
function IndexRow({change, symbol, uuid, price, name}: Coins) {
    const [,setCookie ,] = useCookies();


    const onClickHandler = () => {
        setCookie('coinUuid', {
            uuid,
            name,
            symbol,
            price
        })
    }
    const priceManager = () => {
        let priceFloat: number
        parseFloat(price) < 1 ?
            priceFloat = Math.ceil(parseFloat(price) * 100000) / 100000
            :
            priceFloat = Math.ceil(parseFloat(price) * 10) / 10;
        return (
                change > 0 ? <PositiveP>{priceFloat}</PositiveP> : <NegativeP>{priceFloat}</NegativeP>
        )
    }
    return (
        <div className='indexRow' onClick={onClickHandler}>
            <div className='indexRow-header'>
                <p className='header-name'>{name}</p>
                <p className='header-symbol'>{symbol}</p>
            </div>
            {change > 0 ? <PositiveP>{change}%</PositiveP> : <NegativeP>{change}%</NegativeP>}
            {priceManager()}
        </div>
    );
}

export default IndexRow;

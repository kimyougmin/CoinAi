import React from 'react';
import Coins from "../../typs/Coins";
import '../style/IndexRow.css'
import styled from "styled-components";
import { useCookies } from "react-cookie";

const PositiveP = styled.p`
  width: 30%;
  color: red;
`;
const NegativeP = styled.p`
  width: 30%;
  color: blue;
`;

function IndexRow({ change, symbol, uuid, price, name }: Coins) {
  const [, setCookie] = useCookies(['coinUuid']);

  const onClickHandler = () => {
    // ✅ 무조건 문자열로 저장 (객체 전체를 저장하지 않음)
    setCookie('coinUuid', uuid, { path: '/' });
  };

  const formatPrice = (price: string) => {
    const priceFloat = parseFloat(price);
    return priceFloat < 1
      ? (Math.ceil(priceFloat * 100000) / 100000).toFixed(5)
      : (Math.ceil(priceFloat * 10) / 10).toFixed(1);
  };

  const PriceTag = change > 0 ? PositiveP : NegativeP;

  return (
    <div className='indexRow' onClick={onClickHandler}>
      <div className='indexRow-header'>
        <p className='header-name'>{name}</p>
        <p className='header-symbol'>{symbol}</p>
      </div>
      <PriceTag>{change}%</PriceTag>
      <PriceTag>{formatPrice(price)}</PriceTag>
    </div>
  );
}

export default IndexRow;

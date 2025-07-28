import React from 'react';
import Coins from "../../typs/Coins";
import '../style/IndexRow.css'
import styled from "styled-components";

const PositiveP = styled.p`
  width: 30%;
  color: red;
`;
const NegativeP = styled.p`
  width: 30%;
  color: blue;
`;

interface IndexRowProps extends Coins {
  setCoinUuid: (uuid: string) => void;
}

function IndexRow({ change, symbol, uuid, price, name, setCoinUuid }: IndexRowProps) {
  const onClickHandler = () => {
    setCoinUuid(uuid); // 쿠키 대신 상태 변경
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

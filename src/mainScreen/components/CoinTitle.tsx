import React from 'react';
import Coin from "../../typs/Coin";
import '../style/CoinTitle.css';
import arrowDown from "../img/free-icon-downward-arrow-2268476.png";
import arrowUp from "../img/free-icon-upward-arrow-2268475.png";

function CoinTitle({ name, price, iconUrl, symbol, change }: Coin) {
  const numericPrice = parseFloat(price);
  const numericChange = parseFloat(change);
  const isUp = numericChange > 0;
  const isDown = numericChange < 0;
  const changeColor = isUp ? 'red' : isDown ? 'blue' : 'black';
  const arrowImg = isUp ? arrowUp : arrowDown;
  const changeValue = (numericPrice * numericChange / 100).toFixed(2);

  const renderPriceInfo = () => (
    <div className="coinTitleFooter">
      <div className="coinTitleBottom-top">
        <h3 className="price" style={{ color: changeColor }}>{numericPrice.toFixed(2)}</h3>
        <p style={{ color: changeColor }}>dollar</p>
      </div>
      <div className="coinTitleBottom-bottom">
        <p className="change" style={{ color: changeColor }}>
          {isUp ? '+' : ''}{numericChange.toFixed(2)}%
        </p>
        {(isUp || isDown) && (
          <div className="changeValueContainer">
            <img className="arrowImg" src={arrowImg} alt="arrow" />
            <p style={{ color: changeColor }}>{changeValue}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="coinTitle">
      <div className="coinTitleHeader">
        <img src={iconUrl} className="icon" alt={symbol} />
        <h3 className="name">{name}</h3>
        <p className="symbol">{symbol}</p>
      </div>
      {renderPriceInfo()}
    </div>
  );
}

export default CoinTitle;

import React from 'react';
import Coin from "../../typs/Coin";
import '../style/CoinTitle.css';
import arrowDown from "../img/free-icon-downward-arrow-2268476.png";
import arrowUp from "../img/free-icon-upward-arrow-2268475.png";

function CoinTitle({name, price, iconUrl, symbol, change}: Coin) {
    const changeManager = () => {
        if (parseFloat(change) > 0) {
            return (
                <div className='coinTitleBottom'>
                    <div className='coinTitleBottom-top'>
                        <h3 className='price' style={{color: 'red'}}>{price}</h3>
                        <p style={{color: 'red'}}>dollar</p>
                    </div>
                    <div className='coinTitleBottom-bottom'>
                        <p className='change' style={{color: 'red'}}>+ {change}%</p>
                        <div style={{display: "flex"}}>
                            <img className='arrowImg' src={arrowUp}/>
                            <p style={{color: 'red'}}>{parseFloat(price) * parseFloat(change)}</p>
                        </div>
                    </div>
                </div>
                );
        } else if (parseFloat(change) < 0) {
            return (
                <div className='coinTitleBottom'>
                    <div>
                        <h3 className='price' style={{color: 'blue'}}>{price}</h3>
                        <p style={{color: 'blue'}}>dollar</p>
                    </div>
                    <div className='coinTitleBottom-bottom'>
                        <p className='change' style={{color: 'blue'}}>- {change}%</p>
                        <div style={{display: "flex"}}>
                            <img className='arrowImg' src={arrowDown}/>
                            <p style={{color: 'red'}}>{parseFloat(price) * parseFloat(change)}</p>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='coinTitleBottom'>
                    <div>
                        <h3 className='price' style={{color: 'black'}}>{price}</h3>
                        <p style={{color: 'black'}}>dollar</p>
                    </div>
                    <p className='change' style={{color: 'black'}}>{change}%</p>
                </div>
            );
        }
    };
    return (
        <div className='coinTitle'>
            <div className='coinTitleHeader'>
                <img src={iconUrl} className='icon'/>
                <h3 className='name'>{name}</h3>
                <p className='symbol'>{symbol}</p>
            </div>
            {changeManager()}
        </div>
    );
}

export default CoinTitle;
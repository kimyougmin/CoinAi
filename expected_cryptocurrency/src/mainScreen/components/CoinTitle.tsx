import React, {useEffect, useState} from 'react';
import Coin from "../../typs/Coin";
import '../style/CoinTitle.css'

function CoinTitle({name, price, iconUrl, symbol, change}: Coin) {
    const [color, setColor] = useState<string>('');
    useEffect(() => {
        if (parseFloat(change) > 0)
        {
            setColor('red')
        } else {
            setColor('blue')
        }
    });
    return (
        <div>
            <div className='coinTitleHeader'>
                <img src={iconUrl} className='icon'/>
                <h3 className='name'>{name}</h3>
                <p className='symbol'>{symbol}</p>
            </div>
            <div className='coinTitleBottom'>
                <p className='price' style={{color: color}}>{price}</p>
                <p className='change' style={{color: color}}>{change}</p>
            </div>
        </div>
    );
}

export default CoinTitle;
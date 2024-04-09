import React, {useEffect, useState} from 'react';
import Coins from "../../typs/Coins";
import CoinIndexApi from "../../components/CoinIndexApi";
import "../style/CoinIndex.css"
import IndexRow from "../../components/IndexRow";

function CoinIndex() {
    const [coinDate, setCoinDate] = useState<Coins[]>([]);
    const promise = CoinIndexApi();
    const getData = () => {
        promise.then((dummyData) => {
            setCoinDate(dummyData);
        });
    };
    useEffect(() => {
        setTimeout(() => {
            getData();
        }, 3000);
    }, [coinDate]);
    return (
        <div className='coinIndex'>
            {coinDate.map((e, index) => {
                return (
                    <IndexRow
                        key={index}
                        change={e.change}
                        name={e.name}
                        price={e.price}
                        uuid={e.uuid}
                        symbol={e.symbol}/>
                )
            })}
        </div>
    );
}

export default CoinIndex;
import React, {useEffect, useState} from 'react';
import CoinChat from "./components/CoinChat";
import CoinTitle from "./components/CoinTitle";
import CoinIndex from "./components/CoinIndex";
import Navigation from "../components/Navigation";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import Coin from "../typs/Coin";
import './style/MainScreen.css';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_CRYPTO_KEY}`,
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
};
function MainScreen() {
    const [cookies,] = useCookies(['coinUuid']);
    const [coinTitle, setCoinTitle] = useState<Coin>({
        iconUrl: '',
        name: '',
        price: '',
        symbol: '',
        change: ''
    });
    const navi = useNavigate();

    useEffect(() => {
        let url = '';
        if (cookies.coinUuid === undefined) {
            url = `https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
        } else {
            url = `https://coinranking1.p.rapidapi.com/coin/${cookies.coinUuid}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
        }
        coinSearch(url)
    }, []);

    const coinSearch = async (url: string) => {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setCoinTitle({
                name: result.data.coin.name,
                price: result.data.coin.price,
                iconUrl: result.data.coin.iconUrl,
                symbol: result.data.coin.symbol,
                change: result.data.coin.change
            });
        } catch (error) {
            alert(`조회 중 오류가 발생!\n${error}`);
            navi('/*');
        }
    };
    return (
        <div className='mainScreen'>
            <Navigation />
            <div className='mainScreen-body'>
                <div>
                    <CoinTitle name={coinTitle.name} price={coinTitle.price} iconUrl={coinTitle.iconUrl} symbol={coinTitle.symbol} change={coinTitle.change}/>
                    <CoinChat name={coinTitle.name} price={coinTitle.price} iconUrl={coinTitle.iconUrl} symbol={coinTitle.symbol} change={coinTitle.change}/>
                </div>
                <div className='body-coinIndex'>
                    <CoinIndex />
                </div>
            </div>
        </div>
    );
}

export default MainScreen;

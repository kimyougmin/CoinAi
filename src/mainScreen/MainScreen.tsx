import React, {useEffect, useState} from 'react';
import CoinChat from "./components/CoinChat";
import CoinTitle from "./components/CoinTitle";
import CoinIndex from "./components/CoinIndex";
import Navigation from "./components/Navigation";
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
  const [coinUuid, setCoinUuid] = useState("Qwsogvtv82FCd");
  const [coinTitle, setCoinTitle] = useState<Coin>({
    iconUrl: '',
    name: '',
    price: '',
    symbol: '',
    change: ''
  });
  const navi = useNavigate();

  useEffect(() => {
    const url = `https://coinranking1.p.rapidapi.com/coin/${coinUuid}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
    fetchCoinDetail(url);
  }, [coinUuid]); // coinUuid 변경 시 데이터 요청

  const fetchCoinDetail = async (url: string) => {
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!result?.data?.coin) throw new Error("No coin data");

      const { name, price, iconUrl, symbol, change } = result.data.coin;
      setCoinTitle({ name, price, iconUrl, symbol, change });
    } catch (error) {
      console.error("Coin fetch error:", error);
      alert("조회 중 오류가 발생했습니다.");
      navi('/');
    }
  };

  return (
    <div className='mainScreen'>
      <Navigation />
      <div className='mainScreen-body'>
        <div>
          <div className='coin-body'>
            <CoinTitle {...coinTitle} />
            <CoinChat {...coinTitle} />
          </div>
          <CoinIndex setCoinUuid={setCoinUuid} />
        </div>
      </div>
    </div>
  );
}



export default MainScreen;

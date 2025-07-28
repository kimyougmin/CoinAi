import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import CoinOHLC from "../../typs/CoinOHLC";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import Coin from "../../typs/Coin";

const fetchOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': `${process.env.REACT_APP_CRYPTO_KEY}`,
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
  },
};

function CoinChat({ name }: Coin) {
  const [coinHistory, setCoinHistory] = useState<CoinOHLC[]>([]);
  const [cookies] = useCookies(['coinUuid']);

  useEffect(() => {
    const uuid = cookies.coinUuid?.uuid ?? "Qwsogvtv82FCd"; // ✅ uuid 추출
    const url = `https://coinranking1.p.rapidapi.com/coin/${uuid}/ohlc?referenceCurrencyUuid=yhjMzLPhuIDl&interval=day`;

    fetch(url, fetchOptions)
      .then((res) => res.json())
      .then((res) => {
        if (!res.data?.ohlc) {
          throw new Error("올바른 데이터가 반환되지 않았습니다.");
        }

        const resArray = res.data.ohlc.map((e: any) => ({
          x: new Date(e.startingAt),
          y: [
            parseFloat(e.open),
            parseFloat(e.high),
            parseFloat(e.low),
            parseFloat(e.close),
          ],
        }));

        setCoinHistory(resArray);
      })
      .catch((e) => {
        alert(`차트 조회에 실패하였습니다.\n${e}`);
      });
  }, [cookies.coinUuid]);
  useEffect(() => {
    (window as any).anno = (window as any).anno || {};
  }, []);

  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      toolbar: {
        show: true,
      },
    },
    title: {
      text: name,
      align: 'center',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };




  const series = [
    {
      data: coinHistory,
    },
  ];

  return (
    <div style={{ background: 'white' }}>
      <ReactApexChart
        key={name}  // or new Date().toISOString()
        options={options}
        series={series}
        type={'candlestick'}
        height={450}
        width={900}
      />

    </div>
  );
}

export default CoinChat;

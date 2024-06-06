import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import CoinOHLC from "../../typs/CoinOHLC";
import ReactApexChart from 'react-apexcharts'
import ApexOptions = ApexCharts.ApexOptions;
import Coin from "../../typs/Coin";

const fetchOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_CRYPTO_KEY}`,
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
};
function CoinChat({name}: Coin) {
    const [coinHistory, setCoinHistory] = useState<CoinOHLC[]>([]);
    const [cookies,,] = useCookies(['coinUuid']);

    useEffect(() => {
        let url = '';
        if (cookies.coinUuid === undefined) {
            url = `https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/ohlc?referenceCurrencyUuid=yhjMzLPhuIDl&interval=day`;
        } else {
            url = `https://coinranking1.p.rapidapi.com/coin/${cookies.coinUuid.uuid}/ohlc?referenceCurrencyUuid=yhjMzLPhuIDl&interval=day`;
        }
        fetch(url, fetchOptions)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                const resArray = res.data.ohlc.map((e: any) => {
                    return {
                        x: new Date(e.startingAt),
                        y: [parseFloat(e.open), parseFloat(e.high), parseFloat(e.low), parseFloat(e.close)]
                    }
                });
                setCoinHistory(resArray);
            })
            .catch((e) => {
                alert(`차트 조회에 실패하였습니다. \n ${e}`)
            });
    },[cookies.coinUuid]);
    const options = {
        title: {
            text: `${name}`,
            align: "center",
        },
        xaxis: {
            type: "datetime",
            categories: coinHistory
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    } as ApexOptions;
    const series = [
        {
            data: coinHistory
        }
    ];

    return (
        <div style={{background: 'white'}}>
            <ReactApexChart
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
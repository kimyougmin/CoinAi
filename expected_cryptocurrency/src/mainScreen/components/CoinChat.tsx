import React, {useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import CoinOHLC from "../../typs/CoinOHLC";
import ReactApexChart from 'react-apexcharts'
import ApexOptions = ApexCharts.ApexOptions;
import Coin from "../../typs/Coin";

const fetchOptions = {
    method: 'GET',
    params: {
        interval: 'minute'
    },
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
            url = `https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/ohlc`;
        } else {
            url = `https://coinranking1.p.rapidapi.com/coin/${cookies.coinUuid.uuid}/ohlc`;
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
            });
    },[cookies.coinUuid]);
    const options = {
        title: {
            text: `${name}`,
            align: "center",
        },
        xaxis: {
            type: "datetime",
            categories: coinHistory.map((e) => e.x)
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
        <div>
            <ReactApexChart
                options={options}
                series={series}
                type={'candlestick'}
                height={350}
                width={700}
            />
        </div>
    );
}

export default CoinChat;
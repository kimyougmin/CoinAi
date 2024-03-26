import React, {useEffect, useState} from 'react';
import styled, { keyframes } from 'styled-components';
import Navigation from "../components/Navigation";
import '../components/IndexNavigation.css'
import Coins from "../typs/coins";
import IndexRow from "../components/IndexRow";
import './IndexScreen.css'

// CSS keyframes
const jumboAnimation = keyframes`
  from {
    background-position: 50% 50%, 50% 50%;
  }
  to {
    background-position: 350% 50%, 350% 50%;
  }
`;

// Styled component for jumbo element
const Jumbo = styled.div`
  --stripes: repeating-linear-gradient(100deg, #fff 0%, #fff 7%, transparent 10%, transparent 12%, #fff 16%);
  --rainbow: repeating-linear-gradient(100deg, #60a5fa 10%, #e879f9 15%, #60a5fa 20%, #5eead4 25%, #60a5fa 30%);

  background-image: var(--stripes), var(--rainbow);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
  filter: blur(10px) invert(100%);
  mask-image: radial-gradient(ellipse at 100% 0%, white 40%, transparent 70%);
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--stripes), var(--rainbow);
    background-size: 200%, 100%;
    animation: ${jumboAnimation} 60s linear infinite;
    background-attachment: fixed;
    mix-blend-mode: difference;
  }
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: white;
  transition: background-color 0.3s ease-in-out;
`;
function IndexScreen() {
    const [coinDate, setCoinDate] = useState<Coins[]>([])
    const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${process.env.REACT_APP_CRYPTO_KEY}`,
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    };
    useEffect(() => {
        setInterval(() => {
            try {
                fetch(url, options)
                    .then((res) => res.json())
                    .then((res) => {
                        const coinIndex:Coins[] = res.data.coins.map((e: Coins) => {
                            return {
                                change: e.change,
                                iconUrl: e.iconUrl,
                                name: e.name,
                                price: e.price,
                                uuid: e.uuid,
                                symbol: e.symbol,
                                sparkline: e.sparkline,
                                rank: e.rank
                            }
                        })
                        console.log('코인 조회', coinIndex)
                        setCoinDate(coinIndex)
                    })
            } catch (error) {
                console.error(error);
            }
        }, 1000)
    }, [])


    return (
        <div className='' style={{paddingTop: '75px'}}>
            <MainContainer style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center'}} >
                <div style={{position: 'absolute', inset: -10, overflow: "hidden"}} >
                    <Jumbo style={{position: 'absolute', inset: '10px', opacity: 0.5}}/>
                </div>
                <div className='rowTitle'>
                    <p>로고</p>
                    <p>이름</p>
                    <p>변동값</p>
                    <p>가격</p>
                    <p>심볼</p>
                </div>
                {coinDate.map((e, index) => {
                    return (
                        <IndexRow
                            key={index}
                            change={e.change}
                            iconUrl={e.iconUrl}
                            name={e.name}
                            price={e.price}
                            uuid={e.uuid}
                            symbol={e.symbol}
                            sparkline={e.sparkline}
                            rank={e.rank} />
                    )
                })}
                <Navigation />

            </MainContainer>
        </div>
    );
}

export default IndexScreen;

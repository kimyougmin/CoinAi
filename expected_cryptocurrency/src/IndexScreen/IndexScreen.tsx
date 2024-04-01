import React, {useEffect, useState} from 'react';
import styled, { keyframes } from 'styled-components';
import Navigation from "../components/Navigation";
import '../components/IndexNavigation.css'
import Coins from "../typs/coins";
import IndexRow from "../components/IndexRow";
import './IndexScreen.css'
import CoinIndexApi from "../components/CoinIndexApi";

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
    z-index: -2;
    
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
    height: 100vh;
    background-color: white;
    transition: background-color 0.3s ease-in-out;
    z-index: -1;
`;
const IndexScreen = () => {
    const [coinDate, setCoinDate] = useState<Coins[]>([]);
    const promise = CoinIndexApi();
    const getData = () => {
        promise.then((dummyData) => {
            setCoinDate(dummyData);
        });
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className='' style={{paddingTop: '75px'}}>
            <Navigation/>
            <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                <div className='rowTitle'>
                    <p>로고</p>
                    <p style={{width: '15%'}}>이름</p>
                    <p style={{width: '10%'}}>변동값</p>
                    <p style={{width: '20%', paddingLeft: '25px'}}>가격</p>
                    <p style={{width: '10%'}}>심볼</p>
                    <p style={{width: '3%'}}>랭크</p>
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
                            rank={e.rank}/>
                    )
                })}
            </div>
            <MainContainer style={{
                position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{position: 'absolute', inset: -20, overflow: "hidden"}}>
                    <Jumbo style={{position: 'absolute', inset: 10, opacity: 0.5}}/>
                </div>
            </MainContainer>
        </div>
    );
}

export default IndexScreen;

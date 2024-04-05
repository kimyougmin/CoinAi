import React, {useEffect} from 'react';
import styled, { keyframes } from 'styled-components';
import {useCookies} from "react-cookie";
import Navigation from "../components/Navigation";
import CoinChat from "./components/CoinChat";

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
  --stripesDark: repeating-linear-gradient(100deg, #000 0%, #000 7%, transparent 10%, transparent 12%, #000 16%);
  --rainbow: repeating-linear-gradient(100deg, #60a5fa 10%, #e879f9 15%, #60a5fa 20%, #5eead4 25%, #60a5fa 30%);

  background-image: var(--stripes), var(--rainbow);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
  filter: blur(10px) invert(100%);
  mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: var(--stripesDark), var(--rainbow);
    background-size: 200%, 100%;
    filter: blur(10px) opacity(50%) saturate(200%);
    animation: ${jumboAnimation} 60s linear infinite;
    background-attachment: fixed;
    mix-blend-mode: difference;
  }
`;

// Styled component for main container
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
  transition: background-color 0.3s ease-in-out;
`;
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_CRYPTO_KEY}`,
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
};
function MainScreen() {
    const [cookies,,] = useCookies(['coinUuid']);

    useEffect(() => {
        let url = '';
        if (cookies.coinUuid === undefined) {
            url = `https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
        } else {
            url = `https://coinranking1.p.rapidapi.com/coin/${cookies.coinUuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`;
        }
        fetch(url, options)
            .then((res) => res.json())
            .then((res) => {
                console.log(res.data.history)
            })
            .catch((e) => {
                console.log(e);
            })
    },[]);
    return (
        <MainContainer style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center'}}>
            <Navigation />
            <div style={{position: 'absolute'}}>
                <CoinChat />
            </div>
            <div style={{position: 'absolute', inset: -10, overflow: "hidden"}}>
                <Jumbo style={{position: 'absolute', inset: '10px', opacity: 0.5}}/>
            </div>
        </MainContainer>
    );
}

export default MainScreen;

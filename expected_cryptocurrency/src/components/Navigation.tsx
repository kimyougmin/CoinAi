import React from 'react';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import styled, {keyframes} from "styled-components";
import './Navigation.css'

const jumboAnimation = keyframes`
  from {
    background-position: 50% 50%, 50% 50%;
  }
  to {
    background-position: 350% 50%, 350% 50%;
  }
`;

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

function Navigation() {
    const navi = useNavigate();
    const [,,removeCookie] = useCookies();

    const indexBtnHandler = () => {
        navi('/');
        removeCookie('coinUuid');
    }
    const coinChatBtnHandler = () => {
        navi('/main');
    }
    return (
        <div className='navigation'>
            <h1 className="">
                Coin
                <span className="naviSpan">
                    <span>AI</span>
                </span>
            </h1>
            <div className='naviBtn' style={{zIndex: 1}}>
                <button className='indexBtn' onClick={indexBtnHandler}>Index</button>
                <p>|</p>
                <button className='coinChatBtn' onClick={coinChatBtnHandler}>Coin Chat</button>
            </div>
            <div className='naviBtn' style={{width: '9%'}}>
                <p>Login</p>
            </div>
            <div style={{position: 'absolute', inset: -10, overflow: "hidden"}}>
                <Jumbo style={{position: 'absolute', inset: '10px', opacity: 0.5}}/>
            </div>
        </div>
    );
}

export default Navigation;

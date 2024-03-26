import React from 'react';
import styled, { keyframes } from 'styled-components';

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

  &.dark {
    background-color: black;
  }
`;
function MainScreen() {
    return (
        <MainContainer style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center'}} className="relative flex flex-col items-center justify-center transition-bg">
            <div style={{position: 'absolute', inset: -10, overflow: "hidden"}} className="absolute inset-0 overflow-hidden">
                <Jumbo style={{position: 'absolute', inset: '10px', opacity: 0.5}} className="jumbo absolute -inset-[10px] opacity-50" />
            </div>
        </MainContainer>
    );
}

export default MainScreen;
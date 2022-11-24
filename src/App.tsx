import "./App.css";

import styled, { keyframes, Keyframes } from "styled-components";
import React from "react";

interface SecondsWrapperProps {
  keyframes: Keyframes;
  seconds: number;
}

const SecondsWrapper = styled.div`
  animation: ${(props: SecondsWrapperProps) => props.keyframes}
    ${(props: SecondsWrapperProps) => `${props.seconds}s`} linear infinite;
`;

interface SecondsElementProps {
  offset: number;
  key: string;
  children?: React.ReactNode;
}

const SecondsElement: React.FC<SecondsElementProps> = (props) => {
  const keyframe = keyframes`
    from {
      transform: rotate(calc(${props.offset} * 30deg)) translate(-60px);
    }
    to {
      transform: rotate(calc(${props.offset} * 30deg + 360deg)) translate(-60px);
    }
  `;
  return (
    <span className="seconds-element">
      <SecondsWrapper keyframes={keyframe} seconds={60}>
        <span>{props.children}</span>
      </SecondsWrapper>
    </span>
  );
};

function App() {
  const date = new Date();
  const seconds = date.getSeconds();
  const secondsOffset = (seconds / 60) * 12;
  console.log(date, seconds, secondsOffset);
  const secondsElements = new Array(12).fill(0).map((_, index) => {
    return (
      <SecondsElement
        offset={12 - index + secondsOffset}
        key={`seconds-${index}`}
      >
        {(index * 5).toFixed(0).padStart(2, "0")}
      </SecondsElement>
    );
  });
  return (
    <div className="App">
      <div className="clock">
        <div className="seconds">{secondsElements}</div>
      </div>
    </div>
  );
}

export default App;

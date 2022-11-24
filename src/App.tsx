import "./App.css";

import styled, { keyframes } from "styled-components";
import React from "react";

const WheelRotationKeyframes = keyframes`
  ${new Array(60)
    .fill(0)
    .map((_, i) => {
      var percent = ((i * 100) / 60).toFixed(2);
      var rotation = 6 * i;
      return `${percent}% { transform: rotate(${rotation}deg) }`;
    })
    .join(" ")}
`;

const WheelRotation = styled.div`
  animation: ${WheelRotationKeyframes} 60s
    cubic-bezier(0.6, -0.28, 0.735, 0.045) infinite;
`;

const SecondsElement: React.FC<{ value: number; date: Date }> = ({
  value,
  date,
}) => {
  const seconds = date.getSeconds();
  const offset = seconds * (360 / 60);
  const baseRotation = (60 - value) * (360 / 60);
  const rotation = baseRotation + offset;
  const style = {
    transform: `rotate(${rotation}deg) translate(-60px)`,
  };
  return (
    <span className="seconds-element" key={`seconds-${value}`} style={style}>
      {value.toFixed(0).padStart(2, "0")}
    </span>
  );
};

const SecondsWheel: React.FC<{ date: Date }> = ({ date }) => {
  const elements = Array(12)
    .fill(0)
    .map((_, index) => {
      return <SecondsElement value={index * 5} date={date} />;
    });
  return (
    <div className="seconds-wheel">
      <WheelRotation>{elements}</WheelRotation>
    </div>
  );
};

function App() {
  const date = new Date();
  return (
    <div className="clock">
      <SecondsWheel date={date} />
    </div>
  );
}

export default App;

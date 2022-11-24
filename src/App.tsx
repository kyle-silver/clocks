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
  100% { transform: rotate(360deg) }
`;

const SecondsWheelRotation = styled.div`
  animation: ${WheelRotationKeyframes} 60s
    cubic-bezier(0.6, -0.28, 0.735, 0.045) infinite;
`;

const MinuteWheelRotation = styled.div`
  animation: ${WheelRotationKeyframes} 3600s linear infinite;
`;

const HourWheelRotation = styled.div`
  animation: ${WheelRotationKeyframes} calc(60 * 60 * 12) s linear infinite;
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
    transform: `rotate(${rotation}deg) translate(-90px)`,
  };
  const element =
    value % 5 === 0 ? (
      <div className="number">{value.toFixed(0).padStart(2, "0")}</div>
    ) : (
      <div className="tick" />
    );
  return (
    <div className="clock-element" key={`seconds-${value}`} style={style}>
      {element}
    </div>
  );
};

const SecondsWheel: React.FC<{ date: Date }> = ({ date }) => {
  const elements = Array(60)
    .fill(0)
    .map((_, index) => {
      return <SecondsElement value={index} date={date} />;
    });
  return (
    <div className="clock-wheel">
      <SecondsWheelRotation>{elements}</SecondsWheelRotation>
    </div>
  );
};

const MinutesElement: React.FC<{ value: number; date: Date }> = ({
  value,
  date,
}) => {
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const time = minutes + seconds / 60;
  const offset = time * (360 / 60);
  const baseRotation = (60 - value) * (360 / 60);
  const rotation = baseRotation + offset;
  const style = {
    transform: `rotate(${rotation}deg) translate(-125px)`,
  };
  const element =
    value % 5 === 0 ? (
      <div className="number">{value.toFixed(0).padStart(2, "0")}</div>
    ) : (
      <div className="tick" />
    );
  return (
    <div className="clock-element" key={`seconds-${value}`} style={style}>
      {element}
    </div>
  );
};

const MinuteWheel: React.FC<{ date: Date }> = ({ date }) => {
  const elements = Array(60)
    .fill(0)
    .map((_, index) => {
      return <MinutesElement value={index} date={date} />;
    });
  return (
    <div className="minute-wheel">
      <MinuteWheelRotation>{elements}</MinuteWheelRotation>
    </div>
  );
};

const HoursElement: React.FC<{ value: number; date: Date }> = ({
  value,
  date,
}) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const time = hours + minutes / 60 + seconds / 3600;
  const offset = time * (360 / 60) * 5;
  const baseRotation = (60 - value) * (360 / 60) * 5;
  const rotation = baseRotation + offset;
  const style = {
    transform: `rotate(${rotation}deg) translate(-180px)`,
  };
  return (
    <div className="clock-element" key={`seconds-${value}`} style={style}>
      <div className="hour-number">{value.toFixed(0).padStart(2, "\xa0")}</div>
    </div>
  );
};

const HourWheel: React.FC<{ date: Date }> = ({ date }) => {
  const elements = Array(12)
    .fill(0)
    .map((_, index) => {
      return <HoursElement value={index + 1} date={date} />;
    });
  return (
    <div className="hour-wheel">
      <HourWheelRotation>{elements}</HourWheelRotation>
    </div>
  );
};

function App() {
  const date = new Date();
  return (
    <div className="clock">
      <SecondsWheel date={date} />
      <MinuteWheel date={date} />
      <HourWheel date={date} />
      <div className="hand" />
    </div>
  );
}

export default App;

import "./App.css";

import styled, { keyframes } from "styled-components";
import React from "react";

class Rotations {
  _seconds: number;
  _minutes: number;
  _hours: number;

  constructor(date: Date) {
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    this._seconds = s;
    this._minutes = m + s / 60;
    this._hours = h + m / 60 + s / 3600;
  }

  seconds(value: number): number {
    const offset = this._seconds * (360 / 60);
    const baseRotation = (60 - value) * (360 / 60);
    return baseRotation + offset;
  }

  minutes(value: number): number {
    const offset = this._minutes * (360 / 60);
    const baseRotation = (60 - value) * (360 / 60);
    return baseRotation + offset;
  }

  hours(value: number): number {
    const offset = this._hours * (360 / 60) * 5;
    const baseRotation = (60 - value) * (360 / 60) * 5;
    return baseRotation + offset;
  }
}

const SecondsWheelKeyframes = keyframes`
  ${new Array(60)
    .fill(0)
    .map((_, i) => {
      var percent: string = ((i * 100) / 60).toFixed(2);
      var rotation = 6 * i;
      return `${percent}% { transform: rotate(${rotation}deg) }`;
    })
    .join(" ")}
  100% { transform: rotate(360deg) }
`;

const LinearWheelKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SecondsWheelRotation = styled.div`
  animation: ${SecondsWheelKeyframes} 60s cubic-bezier(0.6, -0.28, 0.735, 0.045) infinite;
`;

const MinuteWheelRotation = styled.div`
  animation: ${LinearWheelKeyframes} 3600s linear infinite;
`;

const HourWheelRotation = styled.div`
  animation: ${LinearWheelKeyframes} 43200s linear infinite;
`;

interface ElementProps {
  value: number;
  rotations: Rotations;
}

interface WheelProps {
  rotations: Rotations;
}

const SecondsElement: React.FC<ElementProps> = ({ value, rotations }) => {
  const rotation = rotations.seconds(value);
  const style = {
    transform: `rotate(${rotation}deg) translate(-90px)`,
  };
  return (
    <div className="clock-element" key={`seconds-${value}`} style={style}>
      {value % 5 === 0 && <div className="number">{value.toFixed(0).padStart(2, "0")}</div>}
      {value % 5 !== 0 && <div className="tick" />}
    </div>
  );
};

const SecondsWheel: React.FC<WheelProps> = ({ rotations }) => {
  const elements = Array(60)
    .fill(0)
    .map((_, index) => {
      return <SecondsElement value={index} rotations={rotations} />;
    });
  return (
    <div className="clock-wheel">
      <SecondsWheelRotation>{elements}</SecondsWheelRotation>
    </div>
  );
};

const MinutesElement: React.FC<ElementProps> = ({ value, rotations }) => {
  const rotation = rotations.minutes(value);
  const style = {
    transform: `rotate(${rotation}deg) translate(-125px)`,
  };
  return (
    <div className="clock-element" key={`seconds-${value}`} style={style}>
      {value % 5 === 0 && <div className="number">{value.toFixed(0).padStart(2, "0")}</div>}
      {value % 5 !== 0 && <div className="tick" />}
    </div>
  );
};

const MinuteWheel: React.FC<WheelProps> = ({ rotations }) => {
  const elements = Array(60)
    .fill(0)
    .map((_, index) => {
      return <MinutesElement value={index} rotations={rotations} />;
    });
  return (
    <div className="minute-wheel">
      <MinuteWheelRotation>{elements}</MinuteWheelRotation>
    </div>
  );
};

const HoursElement: React.FC<ElementProps> = ({ value, rotations }) => {
  const rotation = rotations.hours(value);
  const style = {
    transform: `rotate(${rotation}deg) translate(-180px)`,
  };
  return (
    <div className="clock-element" key={`seconds-${value}`} style={style}>
      <div className="hour-number">{value.toFixed(0).padStart(2, "\u2007")}</div>
    </div>
  );
};

const HourWheel: React.FC<WheelProps> = ({ rotations }) => {
  const elements = Array(12)
    .fill(0)
    .map((_, index) => {
      return <HoursElement value={index + 1} rotations={rotations} />;
    });
  return (
    <div className="hour-wheel">
      <HourWheelRotation>{elements}</HourWheelRotation>
    </div>
  );
};

function App() {
  const date = new Date();
  const rotations = new Rotations(date);
  return (
    <div className="clock">
      <SecondsWheel rotations={rotations} />
      <MinuteWheel rotations={rotations} />
      <HourWheel rotations={rotations} />
      <div className="hand" />
    </div>
  );
}

export default App;

import "./Timescale.css";
import "./Scaling.css";

import styled, { keyframes } from "styled-components";
import React, { CSSProperties, useEffect, useState } from "react";

export class Rotations {
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
      var rotation: number = 6 * i;
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
    transform: `rotate(${rotation}deg) translate(var(--seconds-wheel-radius))`,
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
    transform: `rotate(${rotation}deg) translate(var(--minute-wheel-radius))`,
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
    transform: `rotate(${rotation}deg) translate(var(--hour-wheel-radius))`,
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

interface SliderState {
  meridian: string;
  css: CSSProperties;
}

const AM_TO_PM = {
  animation: "slide-to-pm 0.5s cubic-bezier(0.82, -0.02, 0.41, 1.22)",
  transform: "translate(2.9ch)",
};

const PM_TO_AM = {
  animation: "slide-to-am 0.5s cubic-bezier(0.82, -0.02, 0.41, 1.22)",
  transform: "translate(0ch)",
};

const Meridian: React.FC<{ date: Date }> = ({ date }) => {
  // keep track of the hour
  const meridian = date.getHours() >= 12 ? "PM" : "AM";
  const [state, setState] = useState<SliderState>({
    meridian,
    css: meridian === "PM" ? { transform: "translate(0ch)" } : { transform: "translate(2.9ch" },
  });
  // swap AM and PM
  useEffect(() => {
    let interval = setInterval(() => {
      const updated = new Date().getHours() >= 12 ? "PM" : "AM";
      if (updated !== state.meridian) {
        console.log(`updating from ${state} to ${updated}`);
        setState({
          meridian: updated,
          css: updated === "AM" ? PM_TO_AM : AM_TO_PM,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <div className="meridian">
      <div className="indicator" id="am">
        AM
      </div>
      <div className="indicator" id="pm">
        PM
      </div>
      <div className="slider" style={state.css}>
        AM
      </div>
    </div>
  );
};

export const Timescale: React.FC<{}> = () => {
  const date = new Date();
  const rotations = new Rotations(date);
  return (
    <div className="clock">
      <SecondsWheel rotations={rotations} />
      <MinuteWheel rotations={rotations} />
      <HourWheel rotations={rotations} />
      <div className="hand" />
      <Meridian date={date} />
    </div>
  );
};

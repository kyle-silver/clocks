import styled, { keyframes } from "styled-components";

const SECONDS_IN_HOUR = 60 * 60;
const SECONDS_IN_TWELVE_HOURS = SECONDS_IN_HOUR * 12;

class Rotations {
  hour: number;
  minute: number;
  second: number;

  constructor(date: Date) {
    this.hour = date.getHours();
    this.minute = date.getMinutes();
    this.second = date.getSeconds();
  }

  secondsSinceCompletedRevolution(): number {
    return (this.hour % 12) * SECONDS_IN_HOUR + this.minute * 60 + this.second;
  }

  innerWheelRevolutionDegrees(): number {
    const percentOfRevolutionCompleted = this.secondsSinceCompletedRevolution() / SECONDS_IN_TWELVE_HOURS;
    return percentOfRevolutionCompleted * 360;
  }

  minuteWheelRotationDegrees(): number {
    const secondsIntoHour = this.minute * 60 + this.second;
    const percentOfHourCompleted = secondsIntoHour / SECONDS_IN_HOUR;
    return percentOfHourCompleted * -360;
  }

  secondWheelRotationDegrees(): number {
    const percentOfMinuteCompleted = this.second / 60;
    return percentOfMinuteCompleted * -360;
  }
}

interface RevolutionProps {
  rotations: Rotations;
  translation: string;
}

const RevolutionKeyframes = (rotations: Rotations, translation: string) => keyframes`
  from {
    transform: rotate(${rotations.innerWheelRevolutionDegrees()}deg) translateY(var(${translation}))
  }
  to {
    transform: rotate(${rotations.innerWheelRevolutionDegrees() + 360}deg) translateY(var(${translation}))
  }
`;

const RevolutionAnimation = styled.div`
  animation: ${(props: RevolutionProps) => RevolutionKeyframes(props.rotations, props.translation)} 43200s linear
    infinite;
`;

const SecondWheelRotationKeyframes = (rotations: Rotations) => keyframes`
  from {
    transform: rotate(${rotations.secondWheelRotationDegrees()}deg)
  }
  to {
    transform: rotate(${rotations.secondWheelRotationDegrees() - 360}deg)
  }
`;

const SecondWheelRotationAnimation = styled.div`
  animation: ${(props: { rotations: Rotations }) => SecondWheelRotationKeyframes(props.rotations)} 60s linear infinite;
`;

const MinuteWheelRotationKeyframes = (rotations: Rotations) => keyframes`
  from {
    transform: rotate(${rotations.minuteWheelRotationDegrees()}deg)
  }
  to {
    transform: rotate(${rotations.minuteWheelRotationDegrees() - 360}deg)
  }
`;

const MinuteWheelRotationAnimation = styled.div`
  animation: ${(props: { rotations: Rotations }) => MinuteWheelRotationKeyframes(props.rotations)} 3600s linear infinite;
`;

const HandKeyframes = (rotations: Rotations) => keyframes`
  from {
    transform: rotate(${rotations.innerWheelRevolutionDegrees() + 90}deg) translate(var(--cc-hand-radius));
  }
  to {
    transform: rotate(${rotations.innerWheelRevolutionDegrees() + 90 + 360}deg) translate(var(--cc-hand-radius));
  }
`;

const HandAnimation = styled.div`
  animation: ${(props: { rotations: Rotations }) => HandKeyframes(props.rotations)} 43200s linear infinite;
`;

interface WheelProps {
  rotations: Rotations;
}

const SecondsElement: React.FC<{ value: number }> = ({ value }) => {
  const rotation = value * 6 + 90;
  const style = {
    transform: `rotate(${rotation}deg) translate(var(--cc-second-wheel-radius))`,
  };
  return (
    <div className="cc-clock-element" key={`seconds-${value}`} style={style}>
      {value % 5 === 0 && <div className="cc-number">{value.toFixed(0).padStart(2, "0")}</div>}
      {value % 5 !== 0 && <div className="cc-tick" />}
    </div>
  );
};

const SecondsWheel: React.FC<WheelProps> = ({ rotations }) => {
  const elements = Array(60)
    .fill(0)
    .map((_, index) => {
      return <SecondsElement value={index} />;
    });
  return (
    <RevolutionAnimation rotations={rotations} translation={"--cc-second-wheel-displacement"}>
      <SecondWheelRotationAnimation rotations={rotations}>{elements}</SecondWheelRotationAnimation>
    </RevolutionAnimation>
  );
};

const MinutesElement: React.FC<{ value: number }> = ({ value }) => {
  const rotation = value * 6 + 90;
  const style = {
    transform: `rotate(${rotation}deg) translate(var(--cc-minute-wheel-radius))`,
  };
  return (
    <div className="cc-clock-element" key={`seconds-${value}`} style={style}>
      {value % 5 === 0 && <div className="cc-number">{value.toFixed(0).padStart(2, "0")}</div>}
      {value % 5 !== 0 && <div className="cc-tick" />}
    </div>
  );
};

const MinuteWheel: React.FC<WheelProps> = ({ rotations }) => {
  const elements = Array(60)
    .fill(0)
    .map((_, index) => {
      return <MinutesElement value={index} />;
    });
  return (
    <RevolutionAnimation rotations={rotations} translation={"--cc-minute-wheel-displacement"}>
      <MinuteWheelRotationAnimation rotations={rotations}>{elements}</MinuteWheelRotationAnimation>
    </RevolutionAnimation>
  );
};

const HourElement: React.FC<{ value: number }> = ({ value }) => {
  const rotation = value * 6 + 90;
  const position = {
    transform: `rotate(${rotation}deg) translate(var(--cc-hour-wheel-radius))`,
  };
  const orientation = {
    transform: `rotate(${-rotation}deg) `,
  };
  return (
    <div className="cc-clock-element" key={`seconds-${value}`} style={position}>
      {value % 5 === 0 && (
        <div className="cc-hour-number" style={orientation}>
          {value === 60 ? 12 : (value / 5).toFixed(0)}
        </div>
      )}
    </div>
  );
};

const HourWheel: React.FC<{}> = () => {
  const elements = Array(60)
    .fill(0)
    .map((_, index) => {
      return <HourElement value={index + 1} />;
    });
  return <div className="cc-hour-wheel">{elements}</div>;
};

export const Concentric: React.FC<{}> = () => {
  const date = new Date();
  const rotations = new Rotations(date);
  return (
    <div className="cc-clock">
      <HourWheel />
      <MinuteWheel rotations={rotations} />
      <SecondsWheel rotations={rotations} />
      <HandAnimation rotations={rotations}>
        <div className="cc-concentric-hand" />
      </HandAnimation>
    </div>
  );
};

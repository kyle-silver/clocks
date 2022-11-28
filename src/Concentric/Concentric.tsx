import "./Concentric.css";
import "./Scaling.css";

const SecondsElement: React.FC<{ value: number }> = ({ value }) => {
  const rotation = value * 6 + 90;
  const style = {
    transform: `rotate(${rotation}deg) translate(var(--seconds-wheel-radius))`,
  };
  const orientation = {
    // transform: `rotate(-90deg) `,
  };
  return (
    <div className="clock-element" key={`seconds-${value}`} style={style}>
      {value % 5 === 0 && (
        <div className="seconds-number" style={orientation}>
          {value.toFixed(0).padStart(2, "0")}
        </div>
      )}
      {value % 5 !== 0 && <div className="tick" />}
    </div>
  );
};

const SecondsWheel: React.FC<{}> = () => {
  const elements = Array(60)
    .fill(0)
    .map((_, index) => {
      return <SecondsElement value={index} />;
    });
  return (
    <div className="seconds-wheel-wrapper">
      <div className="seconds-wheel">{elements}</div>
    </div>
  );
};

const MinutesElement: React.FC<{ value: number }> = ({ value }) => {
  const rotation = value * 6 + 90;
  const style = {
    transform: `rotate(${rotation}deg) translate(var(--minute-wheel-radius))`,
  };
  const orientation = {
    // transform: `rotate(-90deg) `,
  };
  return (
    <div className="clock-element" key={`seconds-${value}`} style={style}>
      {value % 5 === 0 && (
        <div className="number" style={orientation}>
          {value.toFixed(0).padStart(2, "0")}
        </div>
      )}
      {value % 5 !== 0 && <div className="tick" />}
    </div>
  );
};

const MinuteWheel: React.FC<{}> = () => {
  const elements = Array(60)
    .fill(0)
    .map((_, index) => {
      return <MinutesElement value={index} />;
    });
  return (
    <div className="minute-wheel-wrapper">
      <div className="minute-wheel">{elements}</div>
    </div>
  );
};

const HourElement: React.FC<{ value: number }> = ({ value }) => {
  const rotation = value * 6 + 90;
  const position = {
    transform: `rotate(${rotation}deg) translate(var(--hour-wheel-radius))`,
  };
  const orientation = {
    transform: `rotate(${-rotation}deg) `,
  };
  return (
    <div className="clock-element" key={`seconds-${value}`} style={position}>
      {value % 5 === 0 && (
        <div className="hour-number" style={orientation}>
          {value === 60 ? 12 : (value / 5).toFixed(0)}
        </div>
      )}
      {/* {value % 5 !== 0 && <div className="tick" />} */}
    </div>
  );
};

const HourWheel: React.FC<{}> = () => {
  const elements = Array(60)
    .fill(0)
    .map((_, index) => {
      return <HourElement value={index + 1} />;
    });
  return <div className="hour-wheel">{elements}</div>;
};

export const Concentric: React.FC<{}> = () => {
  return (
    <div className="clock">
      <HourWheel />
      <MinuteWheel />
      <SecondsWheel />
      <div className="concentric-hand" />
    </div>
  );
};

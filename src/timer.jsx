import React from "react";
import { useTimer } from "react-timer-hook";

export default function Timer({ expiryTimestamp, timeExpired, hasWon }) {
  const { seconds, minutes, pause } = useTimer({
    expiryTimestamp,
    onExpire: () => timeExpired(true),
  });
  React.useEffect(() => {
    //CHECK THE CONDITION TO STOP THE TIMER IF THE GAME IS WON
    if (hasWon) {
      pause();
    }
  }, [hasWon]);
  return (
    <div style={{ textAlign: "center" }}>
      Complete the game in
      <div className="timer">
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

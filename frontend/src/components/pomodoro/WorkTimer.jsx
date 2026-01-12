import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";

const WorkTimer = ({ play, onEnd }) => {
  const { workTime } = useContext(AppContext);
  const [secondsLeft, setSecondsLeft] = useState(workTime * 60);
  const intervalRef = useRef(null);
  const hasStartedRef = useRef(false);

  // Track if timer has actually started
  useEffect(() => {
    if (play) {
      hasStartedRef.current = true;
    }
  }, [play]);

  // Reset timer when workTime changes
  useEffect(() => {
    const newSeconds = workTime * 60;
    setSecondsLeft(newSeconds);

    // If workTime is set to 0 while timer is running, stop it
    if (newSeconds === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      hasStartedRef.current = false;
    }
  }, [workTime]);

  // Handle timer countdown
  useEffect(() => {
    if (play && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (!play && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [play]);

  // Call onEnd only when timer naturally reaches 0 while playing
  useEffect(() => {
    if (secondsLeft === 0 && onEnd && hasStartedRef.current && play) {
      hasStartedRef.current = false;
      onEnd();
    }
  }, [secondsLeft, onEnd, play]);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div className="text-7xl md:text-8xl font-bold tracking-wide text-gray-900">
      {`${minutes}:${seconds}`}
    </div>
  );
};

export default WorkTimer;

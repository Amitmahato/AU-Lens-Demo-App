import { useState, useEffect } from "react";
export const Counter = ({
  timeOutDuration = 3,
  callbackFunction = () => {},
}) => {
  const [counter, setCounter] = useState(timeOutDuration);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);

    setTimer(interval);

    return () => {
      console.log("Clear Interval");
      clearInterval(interval);
    };
  }, []);

  if (counter > 0) {
    return counter;
  } else {
    console.log("💣💣 Time Out 💣💣");
    clearInterval(timer);
    callbackFunction();
    return 0;
  }
};

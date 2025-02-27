import React from "react";
import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";

const CounterDisplays = () => {
  const { state } = useContext(CounterContext);

  const {count} = state;
  return <div className="text-4xl font-bold text-center text-gray-800 dark:text-white">
    Counter : {count}
  </div>;
};

export default CounterDisplays;

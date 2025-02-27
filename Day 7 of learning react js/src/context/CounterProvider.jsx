import { useReducer } from "react";
import { CounterReducer } from "../reducer/CounterReducer";
import { initialState } from "./initialState";
import { CounterContext } from "./CounterContext";

const CounterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CounterReducer, initialState);

  const value = { state, dispatch };

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
};

export default CounterProvider;
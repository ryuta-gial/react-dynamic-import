import { useReducer, useState } from "react";

type State = number;
type Action = { type: "+"; step: number } | { type: "-"; step: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "+":
      return state + action.step;
    case "-":
      return state - action.step;
    default:
      throw new Error("不明なactionです。");
  }
};

const Example = () => {
  const [state, setState] = useState<State>(0);
  const [rstate, dispatch] = useReducer(reducer, 0);

  const countUp = () => {
    setState((prev) => ++prev);
  };
  const countDown = () => {
    setState((prev) => --prev);
  };
  const rcountUp = () => {
    dispatch({ type: "+", step: 2 });
  };
  const rcountDown = () => {
    dispatch({ type: "-", step: 3 });
  };
  return (
    <>
      <div>
        <h3>{state}</h3>
        <button onClick={countUp}>+</button>
        <button onClick={countDown}>-</button>
      </div>
      <div>
        <h3>{rstate}</h3>
        <button onClick={rcountUp}>+</button>
        <button onClick={rcountDown}>-</button>
      </div>
    </>
  );
};

export default Example;

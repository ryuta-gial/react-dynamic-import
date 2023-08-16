import "./App.css";
import { Suspense, useState, useEffect, lazy, FC, ChangeEvent } from "react";
import BaseErrorBoundary from "./BaseErrorBoundary";

const STORAGE_KEY = "rcg-current-lec-index";

interface DynamicLoaderProps {
  component: string;
}

const DynamicLoader: FC<DynamicLoaderProps> = ({ component }) => {
  const LazyComponent = lazy(
    () =>
      /* @vite-ignore */
      import(`${component}`) as Promise<{ default: React.ComponentType<any> }>
  );

  return (
    <BaseErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </BaseErrorBoundary>
  );
};

interface AppProps {
  lectures: string[];
}

const App: FC<AppProps> = ({ lectures }) => {
  let restoredLecIndx = parseInt(localStorage.getItem(STORAGE_KEY) ?? "0");
  restoredLecIndx = restoredLecIndx < lectures.length ? restoredLecIndx : 0;
  const [lecIndex, setLecIndex] = useState<number>(restoredLecIndx);

  const lecId = lectures[lecIndex];

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) =>
    setLecIndex(parseInt(event.target.value));
  useEffect(
    () => localStorage.setItem(STORAGE_KEY, lecIndex.toString()),
    [lecIndex]
  );

  return (
    <div className="App">
      <select className="App-select" value={lecIndex} onChange={handleChange}>
        {lectures.map((id, index) => (
          <option key={id} value={index}>
            {id}
          </option>
        ))}
      </select>

      <div className="App-start">
        <h2>練習コード（start）</h2>
        <DynamicLoader component={`./${lecId}/start/Example`} />
      </div>
      <div className="App-end">
        <h2>完成コード（end）</h2>
        <DynamicLoader component={`./${lecId}/end/Example`} />
      </div>
    </div>
  );
};

export default App;

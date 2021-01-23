import React from "react";
import { useWorker, WORKER_STATUS } from "@koale/useworker";

import bubleSort from "./bublesort";

const demoFunction = (numbers) => {
  const result = bubleSort(numbers)
  return result
}

function LocalDeps() {

  const [workerFn, {
    status: workerFnStatus,
    kill: killWorker
  }] = useWorker(demoFunction, { 
    localDependencies: () => [bubleSort],
    autoTerminate: false
  });

  React.useEffect(()=>{
    console.log("WORKER:", workerFnStatus);
  }, [workerFnStatus])

  const onWorkerClick = () => {
    const numbers = [...Array(50000)].map(() =>
  Math.floor(Math.random() * 1000000)
);
    workerFn(numbers).then(result => {
      console.log("localdeps useWorker()", result);
      alert("Finished: localdeps using useWorker.", { appearance: "success" });
    });
  };

  return (
    <div>
      <section className="App-section">

        <button
          type="button"
          disabled={workerFnStatus === WORKER_STATUS.RUNNING}
          className="App-button"
          onClick={() => onWorkerClick()}
        >
          {workerFnStatus === WORKER_STATUS.RUNNING
            ? `Loading...`
            : `Transferable useWorker()`}
        </button>
        {workerFnStatus === WORKER_STATUS.RUNNING ? (
          <button
            type="button"
            className="App-button"
            onClick={() => killWorker()}
          >
            Kill Worker
          </button>
        ) : null}
      </section>
      <section className="App-section">
        <span style={{ color: "white" }}>
          Open DevTools console to see the results.
        </span>
      </section>
    </div>
  );
}

export default LocalDeps;

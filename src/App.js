import React, { useState } from "react";

import { useWorker } from "@koale/useworker";

import { capitalize } from "./capitalize";


function LocalDeps() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const capFn = (text) => capitalize(text);
  const [wCapitalize] = useWorker(capFn, {
    localDependencies: () => [capitalize]
  });

  return (
    <>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button
        onClick={(_) => {
          wCapitalize(text).then(setResult);
        }}
      >
        Go
      </button>
      {result}
  </>
  );
}

export default LocalDeps;

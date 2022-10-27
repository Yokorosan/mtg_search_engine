import React, { useContext, useEffect, useState } from "react";
import "../src/styles/App.scss";
import { MtgContext } from "./contexts/mtgcontext";

function App() {
  const { getCommander, cmdCard } = useContext(MtgContext);
  useEffect(() => {
    if (cmdCard !== null) {
      console.log(cmdCard);
    }
  }, [cmdCard]);
  return (
    <div className="App">
      <button onClick={() => getCommander()}>Sorteie o numero</button>
    </div>
  );
}

export default App;

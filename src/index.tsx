import React from "react";
import ReactDOM from "react-dom";
import {} from "react-dom/experimental"; // import for experimental-mode type-defs
import App from "./App";

// old sync mode
// ReactDOM.render(<App />, document.getElementById("react-root"));

// concurrent mode style init; see <https://reactjs.org/docs/concurrent-mode-intro.html>
const root = document.getElementById("react-root") as HTMLElement;
ReactDOM.createRoot(root).render(<App />);

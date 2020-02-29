import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

console.log("hello pokedex");
console.log(React);
console.log(ReactDOM);
console.log(App);
console.log(document.getElementById("react-root"));


ReactDOM.render(<App />, document.getElementById("react-root"));

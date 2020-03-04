import React, { useEffect, FunctionComponent, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import PokemonListView from "./components/PokemonListView";
import PokemonDetailsView from "./components/PokemonDetailsView";

const App: FunctionComponent = () => {
  useEffect(() => console.log("finished rendering " + Math.random()));

  // CssBaseline: a style reset

  return (
    <Fragment>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/:name">
            <PokemonDetailsView />
          </Route>
          <Route path="/">
            <PokemonListView />
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;

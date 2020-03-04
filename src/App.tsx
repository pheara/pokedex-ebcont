import React, { FunctionComponent, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";

import PokemonListView from "./components/PokemonListView";
import PokemonDetailsView from "./components/PokemonDetailsView";

const App: FunctionComponent = () => {
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

import React, { useEffect, Suspense, FunctionComponent, Fragment } from "react";
// import ErrorBoundary from "react-error-boundary";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
// import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
// import MenuIcon from "@material-ui/icons/Menu";
import PokemonList from "./PokemonList";
import PokemonDetails from "./PokemonDetails";
import PokemonListView from "./PokemonListView";
import PokemonDetailsView from "./PokemonDetailsView";

const App: FunctionComponent = () => {
  useEffect(() => console.log("finished rendering " + Math.random()));
  // TODO title semantically is not an h6. use as syntax or define own styled comp.

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

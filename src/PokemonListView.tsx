import React, { Suspense, FunctionComponent, Fragment } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import PokemonList from "./PokemonList";

const useStyles = makeStyles((/*theme: Theme*/) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }));

const PokemonListView: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Pokedex
          </Typography>
        </Toolbar>
      </AppBar>
      <ErrorBoundary fallback={<p>Failed to load list of pokemon!</p>}>
        <Suspense fallback={<p>Loading pokemon list...</p>}>
          <PokemonList></PokemonList>
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  );
};
export default PokemonListView;

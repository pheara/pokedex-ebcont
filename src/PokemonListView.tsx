import React, { Suspense, FunctionComponent, Fragment } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import PokemonList from "./PokemonList";
import pokeballIcon from "./icons/pokeball-filled.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    titleIcon: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    pokeballIcon: {
      height: 20,
    },
  })
);

const PokemonListView: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.titleIcon}
            color="inherit"
            aria-label="pokeball icon"
          >
            <img
              src={pokeballIcon}
              alt="pokeball icon"
              className={classes.pokeballIcon}
            />
          </IconButton>
          <Typography variant="h6" component="h1" className={classes.title}>
            Pokedex
          </Typography>
        </Toolbar>
      </AppBar>
      <ErrorBoundary fallback={<p>Failed to load list of pokemon!</p>}>
        <Suspense
          fallback={
            <Fragment>
              <CircularProgress />
              <p>Loading pokemon list</p>
            </Fragment>
          }
        >
          <PokemonList></PokemonList>
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  );
};
export default PokemonListView;

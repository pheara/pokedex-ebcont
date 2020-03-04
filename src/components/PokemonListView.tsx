import React, { Suspense, FunctionComponent, Fragment, useEffect } from "react";

import AppBar from "@material-ui/core/AppBar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

import PokemonList from "./PokemonList";
import ElevationScroll from "./ElevationScroll";
import CenteredLabelledSpinner from "./CenteredLabelledSpinner";
import CenteredErrorMessage from "./CenteredErrorMessage";

import pokeballIcon from "../icons/pokeball-filled.svg";

import { ErrorBoundary } from "./ErrorBoundary";

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
    centeredErrorMessage: {
      display: "block",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    },
  })
);

const PokemonListView: FunctionComponent = props => {
  const classes = useStyles();
  useEffect(() => {
    document.title = "Pokedex";
  });

  return (
    <Fragment>
      <ElevationScroll {...props}>
        <AppBar position="sticky">
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
      </ElevationScroll>

      <Container maxWidth="sm">
        <ErrorBoundary
          fallback={
            <CenteredErrorMessage label="Failed to load list of pokemon!" />
          }
        >
          <Suspense
            fallback={<CenteredLabelledSpinner label="Loading pokemon list." />}
          >
            <PokemonList></PokemonList>
          </Suspense>
        </ErrorBoundary>
      </Container>
    </Fragment>
  );
};
export default PokemonListView;

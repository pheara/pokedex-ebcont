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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const App: FunctionComponent = () => {
  const classes = useStyles();

  useEffect(() => console.log("finished rendering " + Math.random()));
  // TODO title semantically is not an h6. use as syntax or define own styled comp.
  // TODO no menu icon in overview; only a back button in details view
  // CssBaseline: a style reset

  return (
    <Fragment>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
            <Typography variant="h6" className={classes.title}>
              Pokedex
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/:name">
            <ErrorBoundary fallback={<p>Failed to load pokemon!</p>}>
              <Suspense fallback={<p>Loading pokemon ...</p>}>
                <PokemonDetails></PokemonDetails>
              </Suspense>
            </ErrorBoundary>
          </Route>
          <Route path="/">
            <ErrorBoundary fallback={<p>Failed to load list of pokemon!</p>}>
              <Suspense fallback={<p>Loading pokemon list...</p>}>
                <PokemonList></PokemonList>
              </Suspense>
            </ErrorBoundary>
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;

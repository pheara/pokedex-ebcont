import React, { Suspense, FunctionComponent, Fragment } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
// import Button from "@material-ui/core/Button"
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PokemonDetails from "./PokemonDetails";
import { capitalizeFirstLetter } from "./utils";

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

const PokemonDetailsView: FunctionComponent = () => {
  const classes = useStyles();
  const { name } = useParams();
  let titleStr = "Pokedex";
  if (!!name) {
    titleStr = capitalizeFirstLetter(name as string);
  }

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="back"
            component={RouterLink}
            to={"/"}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {titleStr}
          </Typography>
        </Toolbar>
      </AppBar>
      <ErrorBoundary fallback={<p>Failed to load pokemon!</p>}>
        <Suspense fallback={<p>Loading pokemon ...</p>}>
          <PokemonDetails></PokemonDetails>
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  );
};
export default PokemonDetailsView;

import React, { Suspense, FunctionComponent, Fragment, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { capitalizeFirstLetter } from "../utils";

import { ErrorBoundary } from "./ErrorBoundary";
import PokemonDetails from "./PokemonDetails";
import ElevationScroll from "./ElevationScroll";
import { getPokemonDetailsResourceByName } from "../poke-api-wrapper/PokeApiWrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      minHeight: 128,
      alignItems: "flex-start",
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      alignSelf: "flex-end",
    },
    bgImg: {
      display: "block",
      position: "fixed",
      right: "50px",
      height: 180,
      // top: calc(50%-50vh);
    },
    appBar: {
      //   backgroundImage:
      // "url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png)",
      backgroundRepeat: "no-repeat",
      backgroundPositionX: "right",
      backgroundPositionY: -30,
      backgroundSize: 210,
      backgroundBlendMode: "lighten",
    },
  })
);

const PokemonImgAppBar: FunctionComponent = () => {
  const { name } = useParams();
  const pokemonDetailsRes = getPokemonDetailsResourceByName(name as string);
  const pokemonDetails = pokemonDetailsRes.read();
  const imgUrl = pokemonDetails.picture;
  return <ImgAppBar imgUrl={imgUrl.href} />;
};
const FallbackAppBar: FunctionComponent = () => {
  return <ImgAppBar imgUrl={undefined} />;
};

const ImgAppBar: FunctionComponent<{ imgUrl: string | undefined }> = props => {
  // eslint-disable-next-line react/prop-types
  const { imgUrl } = props;
  const classes = useStyles();
  const { name } = useParams();

  useEffect(() => {
    document.title =
      "Pokedex" + (!name ? "" : ` - ${capitalizeFirstLetter(name)}`);
  });

  const bgImgUrlStyle = imgUrl
    ? { backgroundImage: `url(${imgUrl})` }
    : { backgroundImage: `none` };

  return (
    <ElevationScroll {...props}>
      <AppBar
        position="sticky"
        className={classes.appBar}
        style={bgImgUrlStyle}
      >
        <Toolbar className={classes.toolbar}>
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
          <Typography variant="h6" component="h1" className={classes.title}>
            {!name ? "" : capitalizeFirstLetter(name)}
          </Typography>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

const PokemonDetailsView: FunctionComponent = () => {
  const { name } = useParams();

  let titleStr = "Pokedex";
  if (!!name) {
    titleStr = capitalizeFirstLetter(name as string);
  }

  return (
    <Fragment>
      <ErrorBoundary fallback={<FallbackAppBar />}>
        <Suspense fallback={<FallbackAppBar />}>
          <PokemonImgAppBar />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Failed to load pokemon!</p>}>
        <Suspense
          fallback={
            <Fragment>
              <CircularProgress />
              <p>Loading details for {titleStr}</p>
            </Fragment>
          }
        >
          <PokemonDetails></PokemonDetails>
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  );
};
export default PokemonDetailsView;

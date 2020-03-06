/* eslint-disable react/prop-types */
import React, { FunctionComponent, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import {
  getFullPokemonsList,
  getFullPokemonsListResource,
  getPokemonDetailsResourceByName,
} from "../poke-api-wrapper/PokeApiWrapper";

import { capitalizeFirstLetter } from "../utils";
import { PokemonMinimal } from "../model/Pokemon";

getFullPokemonsList().then(list => console.log("catch all of these: ", list));

const resource = getFullPokemonsListResource();

const PokemonList2: FunctionComponent = () => {
  const allPokemon: Array<PokemonMinimal> = resource.read();

  return (
    <List>
      {allPokemon.map((pokemon: PokemonMinimal) => (
        <ListItem
          button
          divider
          key={pokemon.id}
          component={RouterLink}
          to={"/" + pokemon.name}
          onClick={(): void => {
            // already start loading
            getPokemonDetailsResourceByName(pokemon.name);
          }}
        >
          <ListItemAvatar>
            <img src={pokemon.picture.href} alt={pokemon.name} />
          </ListItemAvatar>
          <ListItemText
            primary={capitalizeFirstLetter(pokemon.name)}
            secondary={"#" + pokemon.id}
          />
        </ListItem>
      ))}
    </List>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  })
);
const Row: FunctionComponent<ListChildComponentProps> = props => {
  const classes = useStyles();
  // function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  //   return (
  //     <ListItem button style={style} key={index}>
  //       <ListItemText primary={`Item ${index + 1}`} />
  //     </ListItem>
  //   );
  return (
    <div style={style} className={classes.listItem}>
      Row {index}
    </div>
  );
};

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  );
}

const PokemonList: FunctionComponent = () => {
  const allPokemon: Array<PokemonMinimal> = resource.read();

  return (
    <FixedSizeList height={400} width={300} itemSize={46} itemCount={200}>
      {renderRow}
    </FixedSizeList>

    //</AutoSizer>
    // <AutoSizer>
    //   {({ height, width }): ReactNode => (
    //     <FixedSizeList
    //       height={height}
    //       width={width}
    //       itemSize={46}
    //       itemCount={allPokemon.length}
    //     >
    //       {renderRow}
    //     </FixedSizeList>
    //   )}
    // </AutoSizer>
  );
};

export default PokemonList;

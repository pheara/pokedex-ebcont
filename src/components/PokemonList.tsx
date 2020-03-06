/* eslint-disable react/prop-types */
import React, { FunctionComponent, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

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

function renderRow(props: ListChildComponentProps): JSX.Element {
  const { index, style, data } = props;
  const pokemon: PokemonMinimal = data.allPokemon[index];

  return (
    <ListItem
      button
      divider
      key={index}
      style={style}
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
  );
}

const PokemonList: FunctionComponent = () => {
  const allPokemon: Array<PokemonMinimal> = resource.read();

  return (
    // <FixedSizeList height={400} width={300} itemSize={46} itemCount={200}>
    //   {renderRow}
    // </FixedSizeList>
    <AutoSizer>
      {({ height, width }): ReactNode => (
        <FixedSizeList
          height={height}
          width={width}
          itemSize={118}
          itemCount={allPokemon.length}
          itemData={{ allPokemon: allPokemon }}
        >
          {renderRow}
        </FixedSizeList>
      )}
    </AutoSizer>
  );
};

export default PokemonList;

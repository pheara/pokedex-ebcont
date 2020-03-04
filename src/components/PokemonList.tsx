import React, { FunctionComponent } from "react";
import { Link as RouterLink } from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import {
  getFullPokemonsList,
  getFullPokemonsListResource,
  getPokemonDetailsResourceByName,
} from "../PokeApiWrapper";

import { capitalizeFirstLetter } from "../utils";
import { PokemonMinimal } from "../model/Pokemon";

getFullPokemonsList().then(list => console.log("catch all of these: ", list));

const resource = getFullPokemonsListResource();

const PokemonList: FunctionComponent = () => {
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

export default PokemonList;

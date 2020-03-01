import React, { FunctionComponent } from "react";
import { capitalizeFirstLetter } from "./utils";
import { Link as RouterLink } from "react-router-dom";

import {
  getFullPokemonsList,
  getFullPokemonsListResource,
import { getFullPokemonsList } from "./PokeApiWrapper";
} from "./PokeApiWrapper";
import { PokemonMinimal } from "./model/Pokemon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

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

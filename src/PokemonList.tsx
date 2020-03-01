import React, { FunctionComponent } from "react";
import { wrapPromise, capitalizeFirstLetter } from "./utils";
import { Link as RouterLink } from "react-router-dom";

import { getFullPokemonsList } from "./PokeApiWrapper";
import { PokemonMinimal } from "./model/Pokemon";

import { FixedSizeList } from "react-window";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

getFullPokemonsList().then(list => console.log("catch all of these: ", list));

const resource = wrapPromise(getFullPokemonsList());

const PokemonList: FunctionComponent = () => {
  const allPokemon: Array<PokemonMinimal> = resource.read();

  return (
    <FixedSizeList
      itemCount={allPokemon.length}
      height={400}
      width={300}
      itemSize={46}
    >
      {allPokemon.map((pokemon: PokemonMinimal) => (
        <ListItem
          button
          divider
          key={pokemon.id}
          component={RouterLink}
          to={"/" + pokemon.id}
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
    </FixedSizeList>
  );
};

export default PokemonList;

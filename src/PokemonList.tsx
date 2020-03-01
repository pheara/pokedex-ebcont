import React, { FunctionComponent } from "react";
import { wrapPromise, capitalizeFirstLetter } from "./utils";

import { getFullPokemonsList } from "./PokeApiWrapper";
import { PokemonMinimal } from "./model/Pokemon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
// import MenuIcon from "@material-ui/icons/Menu";

getFullPokemonsList().then(list => console.log("catch all of these: ", list));

const resource = wrapPromise(getFullPokemonsList());

const PokemonList: FunctionComponent = () => {
  const allPokemon: Array<PokemonMinimal> = resource.read();

  return (
    <List>
      {allPokemon.map((pokemon: PokemonMinimal) => (
        <ListItem button divider key={pokemon.id} component="li">
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

// <ul>
//   {allPokemon.map((pokemon: PokemonMinimal) => (
//     <li key={pokemon.id}>
//       <img src={pokemon.picture.href} alt={pokemon.name} />#{pokemon.id}{" "}
//       {capitalizeFirstLetter(pokemon.name)}
//     </li>
//   ))}
// </ul>

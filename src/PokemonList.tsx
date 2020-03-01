import React, { FunctionComponent } from "react";
import { delay, wrapPromise, SuspenseResource } from "./utils";

import { getFullPokemonsList } from "./PokeApiWrapper";
import { PokemonMinimal } from "./model/Pokemon";

getFullPokemonsList().then(list => console.log("catch all of these: ", list));

const resource = wrapPromise(getFullPokemonsList());

const PokemonList: FunctionComponent = () => {
  const allPokemon: Array<PokemonMinimal> = resource.read();

  return (
    <ul>
      {allPokemon.map((pokemon: PokemonMinimal) => (
        <li key={pokemon.id}>
          <img src={pokemon.picture.href} alt={pokemon.name} />#{pokemon.id}{" "}
          {pokemon.name}
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;

import React, { FunctionComponent } from "react";
import { delay, wrapPromise, SuspenseResource } from "./utils";

// import Pokedex from "pokeapi-js-wrapper";

declare function require(path: string): object;
// eslint-disable-next-line no-var-requires
const Pokedex = require("pokeapi-js-wrapper");

console.log("Pokedex: ", Pokedex);

interface DummyPokemon {
  id: number;
  name: string;
}
const dummyData: Array<DummyPokemon> = [
  { name: "A", id: 1 },
  { name: "B", id: 2 },
  { name: "C", id: 3 },
];
const fetchDummyData = (): {
  pokemonList: SuspenseResource<Array<DummyPokemon>>;
} => ({
  pokemonList: wrapPromise(delay(1500).then(() => dummyData)),
});
const failDummyFetching = (): {
  pokemonList: SuspenseResource<Array<DummyPokemon>>;
} => ({
  pokemonList: wrapPromise(
    delay(1500).then(() => {
      throw new Error("Failed fetching as intended.");
    })
  ),
});

const resource = Math.random() > 0.5 ? fetchDummyData() : failDummyFetching();

const PokemonList: FunctionComponent = () => {
  const listData: Array<DummyPokemon> = resource.pokemonList.read();
  return (
    <ul>
      {listData.map((pokemon: DummyPokemon) => (
        <li key={pokemon.id}>{pokemon.name}</li>
      ))}
    </ul>
  );
};

export default PokemonList;

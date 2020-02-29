import React, { FunctionComponent } from "react";
import { delay, wrapPromise, SuspenseResource } from "./utils";

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

const resource = fetchDummyData();

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

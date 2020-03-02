import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PokemonDetailsPure } from "./PokemonDetails";
import { PokemonDetailed } from "./model/Pokemon";

const ralts: PokemonDetailed = {
  id: 280,
  name: "ralts",
  url: new URL("https://pokeapi.co/api/v2/pokemon/280"),
  picture: new URL(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/280.png"
  ),
  abilities: [
    {
      name: "telepathy",
      url: new URL("https://pokeapi.co/api/v2/ability/140/"),
    },
    {
      name: "trace",
      url: new URL("https://pokeapi.co/api/v2/ability/36/"),
    },
    {
      name: "synchronize",
      url: new URL("https://pokeapi.co/api/v2/ability/28/"),
    },
  ],
  moves: [
    {
      name: "toxic",
      url: new URL("https://pokeapi.co/api/v2/move/92/"),
    },
    {
      name: "confusion",
      url: new URL("https://pokeapi.co/api/v2/move/93/"),
    },
    {
      name: "psychic",
      url: new URL("https://pokeapi.co/api/v2/move/94/"),
    },
    {
      name: "hypnosis",
      url: new URL("https://pokeapi.co/api/v2/move/95/"),
    },
    {
      name: "teleport",
      url: new URL("https://pokeapi.co/api/v2/move/100/"),
    },
    {
      name: "dream-eater",
      url: new URL("https://pokeapi.co/api/v2/move/138/"),
    },
    {
      name: "nightmare",
      url: new URL("https://pokeapi.co/api/v2/move/171/"),
    },
  ],
  types: [
    {
      name: "fairy",
      url: new URL("https://pokeapi.co/api/v2/type/18/"),
    },
    {
      name: "psychic",
      url: new URL("https://pokeapi.co/api/v2/type/14/"),
    },
  ],
  baseStats: {
    hp: 28,
    attack: 25,
    defense: 25,
    specialAttack: 45,
    specialDefense: 35,
    speed: 40,
  },
  translatedNames: new Map([
    ["ja", "ラルトス"],
    ["en", "Ralts"],
    ["it", "Ralts"],
    ["es", "Ralts"],
    ["de", "Trasla"],
    ["fr", "Tarsal"],
  ]),
  inEvolutionTree: {
    name: "ralts",
    evolvesTo: [
      {
        name: "kirlia",
        evolvesTo: [
          {
            name: "gardevoir",
            evolvesTo: [],
          },
          {
            name: "gallade",
            evolvesTo: [],
          },
        ],
      },
    ],
  },
  possibleEvolutions: ["kirlia"],
  order: 356,
};
test("Details - types: Check if pokemon's types render to the details-component.", () => {
  const { getByText } = render(<PokemonDetailsPure pokemon={ralts} />);
  const type1 = getByText(/fairy/i);
  expect(type1).toBeInTheDocument();
  const type2 = getByText(/psychic/i);
  expect(type2).toBeInTheDocument();
});

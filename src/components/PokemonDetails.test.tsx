import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PokemonDetailsPure } from "./PokemonDetails";
import { PokemonDetailed } from "../model/Pokemon";

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
  movesViaLevelUp: [
    {
      name: "hypnosis",
      url: new URL("https://pokeapi.co/api/v2/move/95/"),
      minLevelLearned: 10,
    },
  ],
  moves: [
    {
      name: "confusion",
      url: new URL("https://pokeapi.co/api/v2/move/93/"),
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
    attack: 26,
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
function checkDetailsForTexts(regexps: Array<RegExp>): void {
  const { getByText } = render(<PokemonDetailsPure pokemon={ralts} />);
  regexps.forEach(regexp => {
    const match = getByText(regexp);
    expect(match).toBeInTheDocument();
  });
}
test(
  "Details - types: Check if the pokemon's types " +
    "render to the details-component.",
  () => {
    checkDetailsForTexts([/fairy/i, /psychic/i]);
  }
);
test(
  "Details - abilities: Check if the pokemon's abilities " +
    "render to the details-component.",
  () => {
    checkDetailsForTexts([/telepathy/i, /trace/i, /synchronize/i]);
  }
);
test(
  "Details - moves: Check if the pokemon's moves " +
    "render to the details-component.",
  () => {
    checkDetailsForTexts([
      /confusion/i,
      /hypnosis/i,
      /teleport/i,
      /dream-eater/i,
    ]);
  }
);
test(
  "Details - evolution(s): Check if the pokemon's evolution(s) " +
    "render to the details-component.",
  () => {
    checkDetailsForTexts([/kirlia/i]);
  }
);
test(
  "Details - order: Check if the pokemon's order  " +
    "render to the details-component.",
  () => {
    checkDetailsForTexts([/365/]);
  }
);
test(
  "Details - base stats: Check if the pokemon's base-stats  " +
    "render to the details-component.",
  () => {
    checkDetailsForTexts([/28/, /26/, /25/, /45/, /35/, /40/]);
  }
);

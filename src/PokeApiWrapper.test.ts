/* eslint-disable @typescript-eslint/camelcase */
import {
  EvolutionChainLink,
  parseEvolutionTree,
  parseEvolvesTo,
} from "./PokeApiWrapper";
import { EvolutionTree } from "./model/Pokemon";

const venusaurEvolutionChainLink: EvolutionChainLink = {
  evolves_to: [],
  species: {
    name: "venusaur",
    url: "https://pokeapi.co/api/v2/pokemon-species/3/",
  },
};
const ivysaurEvolutionChainLink: EvolutionChainLink = {
  evolves_to: [venusaurEvolutionChainLink],
  species: {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon-species/2/",
  },
};
const bulbasaurEvolutionChainLink: EvolutionChainLink = {
  evolves_to: [ivysaurEvolutionChainLink],
  species: {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon-species/1/",
  },
};

const bulbasaurEvolutionTree: EvolutionTree = {
  name: "bulbasaur",
  evolvesTo: [
    { name: "ivysaur", evolvesTo: [{ name: "venusaur", evolvesTo: [] }] },
  ],
};

const eeveeEvolutionChainLink: EvolutionChainLink = {
  species: {
    name: "eevee",
    url: "https://pokeapi.co/api/v2/pokemon-species/133/",
  },
  evolves_to: [
    {
      evolves_to: [],
      species: {
        name: "vaporeon",
        url: "https://pokeapi.co/api/v2/pokemon-species/134/",
      },
    },
    {
      evolves_to: [],
      species: {
        name: "jolteon",
        url: "https://pokeapi.co/api/v2/pokemon-species/135/",
      },
    },
    {
      evolves_to: [],
      species: {
        name: "flareon",
        url: "https://pokeapi.co/api/v2/pokemon-species/136/",
      },
    },
  ],
};

const eeveeEvolutionTree: EvolutionTree = {
  name: "eevee",
  evolvesTo: [
    { name: "vaporeon", evolvesTo: [] },
    { name: "jolteon", evolvesTo: [] },
    { name: "flareon", evolvesTo: [] },
  ],
};

test("Try parsing bulbasaur's evolution tree.", () => {
  const parsedTree = parseEvolutionTree(bulbasaurEvolutionChainLink);
  expect(parsedTree).toEqual(bulbasaurEvolutionTree);
});

test("Try parsing eevee's evolution tree.", () => {
  const parsedTree = parseEvolutionTree(eeveeEvolutionChainLink);
  expect(parsedTree).toEqual(eeveeEvolutionTree);
});

test("Evolution of ivysaur should be venusaur.", () => {
  const evolvesTo = parseEvolvesTo("ivysaur", bulbasaurEvolutionChainLink);
  expect(evolvesTo).toEqual(["venusaur"]);
});
test("Eevee should evolve to vaporeon, jolteon, flareon (and others).", () => {
  const evolvesTo = parseEvolvesTo("eevee", eeveeEvolutionChainLink);
  expect(evolvesTo).toEqual(["vaporeon", "jolteon", "flareon"]);
});
test("Jolteon should have no evolutions.", () => {
  const evolvesTo = parseEvolvesTo("jolteon", eeveeEvolutionChainLink);
  expect(evolvesTo).toEqual([]);
});

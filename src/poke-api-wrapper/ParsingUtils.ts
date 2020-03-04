import { PokemonMinimal, BaseStatBlock, EvolutionTree } from "../model/Pokemon";
import {
  PokemonListEntry,
  PokemonDetails,
  EvolutionChainLink,
  UnparsedMove,
} from "./PokeApiRawDataTypes";

const pokemonBaseUrl = "https://pokeapi.co/api/v2/pokemon/";
const pictureBaseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export function parseNamedRessourceUrl(res: {
  name: string;
  url: string;
}): { name: string; url: URL } {
  return {
    name: res.name,
    url: new URL(res.url),
  };
}
export function toPokemonMinimal(
  id: number,
  name: string,
  url?: string
): PokemonMinimal {
  if (!url) {
    url = pokemonBaseUrl + id;
  }
  const pokemon: PokemonMinimal = {
    id: id,
    name: name,
    url: new URL(url),
    picture: new URL(pictureBaseUrl + id + ".png"),
  };
  return pokemon;
}

/**
 *
 * @param pokemonDataPoint the result-entries as returned by the v2/pokemon/ collection endpoint
 * @returns a minimal pokemon or undefined if parsing failed
 */
export function parsePokemonListEntry(
  pokemonDataPoint: PokemonListEntry
): PokemonMinimal | undefined {
  // url e.g. "https://pokeapi.co/api/v2/pokemon/12/"
  const id = parseInt(pokemonDataPoint.url.slice(34, -1));
  if (isNaN(id)) {
    console.error("Parsing failed for: ", pokemonDataPoint);
    return undefined;
  } else {
    return toPokemonMinimal(id, pokemonDataPoint.name, pokemonDataPoint.url);
  }
}
export function parseBaseStats(pokemonDetails: PokemonDetails): BaseStatBlock {
  const baseStats: BaseStatBlock = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  };
  pokemonDetails.stats.forEach(stat => {
    if (stat.stat.name == "hp") {
      baseStats.hp = stat.base_stat;
    } else if (stat.stat.name == "attack") {
      baseStats.attack = stat.base_stat;
    } else if (stat.stat.name == "defense") {
      baseStats.defense = stat.base_stat;
    } else if (stat.stat.name == "special-attack") {
      baseStats.specialAttack = stat.base_stat;
    } else if (stat.stat.name == "special-defense") {
      baseStats.specialDefense = stat.base_stat;
    } else if (stat.stat.name == "speed") {
      baseStats.speed = stat.base_stat;
    }
  });
  return baseStats;
}

export function parseEvolutionTree(
  evolutionChain: EvolutionChainLink
): EvolutionTree {
  let evolvesTo: Array<EvolutionTree> = [];
  if (evolutionChain.evolves_to && evolutionChain.evolves_to.length > 0) {
    evolvesTo = evolutionChain.evolves_to.map(parseEvolutionTree);
  }
  const evolutions: EvolutionTree = {
    name: evolutionChain.species.name,
    evolvesTo: evolvesTo,
  };
  return evolutions;
}

/**
 * Traverses the "chain" (i.e. the tree) until it finds `ownName`,
 * then returns all evolutions of that node.
 * @param ownName
 * @param evolutionChain
 */
export function parseEvolvesTo(
  ownName: string,
  evolutionChain: EvolutionChainLink
): Array<string> {
  if (evolutionChain.species.name === ownName) {
    // match
    return evolutionChain.evolves_to.map(evolutions => evolutions.species.name);
  } else if (evolutionChain.evolves_to.length === 0) {
    // end of the chain, return empty
    return [];
  } else {
    // no match but we can traverse
    return evolutionChain.evolves_to.flatMap(evl =>
      parseEvolvesTo(ownName, evl)
    );
  }
}

export function canBeLearnedFromLevelling(move: UnparsedMove): boolean {
  return (
    move.version_group_details
      .map(vgd => vgd.move_learn_method.name)
      .filter(m => m === "level-up").length > 0
  );
}

export function minLevelLearned(move: UnparsedMove): number {
  return Math.min(
    ...move.version_group_details.map(vgd => vgd.level_learned_at)
  );
}

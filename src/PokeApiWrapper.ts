import {
  Ability,
  Move,
  PokemonDetailed,
  PokemonMinimal,
  BaseStatBlock,
  EvolutionTree,
  Type,
} from "./model/Pokemon";

//////////////////////

export interface NamedResource {
  name: string;
  url: string;
}

export declare interface PokemonListEntry {
  url: string;
  name: string;
}

export declare interface PokemonDetails {
  id: number;
  order: number;
  name: string;
  abilities: Array<{
    ability: NamedResource;
  }>;
  moves: Array<{ move: NamedResource }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: NamedResource; // the url holds the stat-index
  }>;
  types: Array<{ type: NamedResource }>;
}
export declare interface PokemonSpecies {
  id: number;
  name: string;
  evolution_chain: { url: string };
  names: Array<{ name: string; language: { name: string; url: string } }>;
}
export declare interface EvolutionChainLink {
  species: NamedResource; // url here is a `pokemon-species/:id` url
  evolves_to: Array<EvolutionChainLink>;
}
export declare interface EvolutionChain {
  chain: EvolutionChainLink;
}

//TODO turn me into a `.d.ts`-file
export declare class PokeApi {
  getPokemonsList(args?: {
    limit?: number;
    offset?: number;
  }): Promise<{
    count: number; //number of
    next: string | null; //url to next pagination page if existing
    previous: string | null; //url to previous pagination page if existing
    results: Array<PokemonListEntry>;
  }>;

  getPokemonByName(name: string): Promise<PokemonDetails>;

  getPokemonSpeciesByName(name: string): Promise<PokemonSpecies>;

  getEvolutionChainById(id: number): Promise<EvolutionChain>;

  /**
   * @param pathOrPaths a single ressource path (e.g. `api/v2/pokemon/1`)
   *   or URL (= ressource-path + base-path), or multiple of them in any
   * combination.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resource(pathOrPaths: string | Array<string>): Promise<any>;
}

////////////////////

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function require(path: string): { Pokedex: any };
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PokedexImport = require("pokeapi-js-wrapper");
console.log("Pokedex: ", PokedexImport);

const pokeApi: PokeApi = new PokedexImport.Pokedex();

////////////////////

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
export function toPokemonMinimal(id: number, name: string, url?: string) {
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

export function getFullPokemonsList(): Promise<Array<PokemonMinimal>> {
  return pokeApi.getPokemonsList({ limit: -1 }).then(resp => {
    if (resp && resp.results) {
      // parse datapoints and pass on those parsing successfully
      const allPokemon: Array<PokemonMinimal> = resp.results
        .map(parsePokemonListEntry)
        // filter out the parsing failures
        .filter(p => !!p) as Array<PokemonMinimal>;
      return allPokemon;
    } else {
      return [];
    }
  });
}

////////////////////

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

export async function getPokemonDetailsByName(
  name: string
): Promise<PokemonDetailed> {
  const detailsP: Promise<PokemonDetails> = pokeApi.getPokemonByName(name);
  const speciesP: Promise<PokemonSpecies> = pokeApi.getPokemonSpeciesByName(
    name
  );
  const evolutionChainP: Promise<EvolutionChain> = speciesP.then(
    (species: PokemonSpecies) => {
      // e.g. https://pokeapi.co/api/v2/evolution-chain/67/
      const matches = species.evolution_chain.url.match(/(\d*)\/?$/);
      if (matches && matches.length > 1) {
        const id = parseInt(matches[1]);
        return pokeApi.getEvolutionChainById(id);
      } else {
        throw new Error(
          "Failed to parse evolution-chain URL: " + species.evolution_chain.url
        );
      }
    }
  );

  const [details, species, evolutionChain] = await Promise.all([
    detailsP,
    speciesP,
    evolutionChainP,
  ]);

  const minimalPokemon: PokemonMinimal = toPokemonMinimal(
    details.id,
    details.name
  );
  const abilities: Array<Ability> = details.abilities.map(a =>
    parseNamedRessourceUrl(a.ability)
  );
  const moves: Array<Move> = details.moves.map(m =>
    parseNamedRessourceUrl(m.move)
  );
  const types: Array<Type> = details.types.map(t =>
    parseNamedRessourceUrl(t.type)
  );
  const baseStats: BaseStatBlock = parseBaseStats(details);

  // names in different languages
  const translatedNames: Map<string, string> = new Map();
  species.names.forEach(n => {
    translatedNames.set(n.language.name, n.name);
  });

  const evolutionTree: EvolutionTree = parseEvolutionTree(evolutionChain.chain);
  const evolvesTo: Array<string> = parseEvolvesTo(
    details.name,
    evolutionChain.chain
  );

  const pokemon: PokemonDetailed = {
    ...minimalPokemon,
    abilities,
    moves,
    types,
    baseStats,
    translatedNames,
    inEvolutionTree: evolutionTree,
    possibleEvolutions: evolvesTo,
    order: details.order,
  };
  return pokemon;
}

////////////////////

export default pokeApi;

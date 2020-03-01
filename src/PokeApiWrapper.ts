import { PokemonMinimal } from "./model/Pokemon";

//////////////////////

declare interface PokemonListEntry {
  url: string;
  name: string;
}

//TODO turn me into a `.d.ts`-file
declare class PokeApi {
  getPokemonsList(args?: {
    limit?: number;
    offset?: number;
  }): Promise<{
    count: number; //number of
    next: string | null; //url to next pagination page if existing
    previous: string | null; //url to previous pagination page if existing
    results: Array<PokemonListEntry>;
  }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function require(path: string): { Pokedex: any };
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PokedexImport = require("pokeapi-js-wrapper");
console.log("Pokedex: ", PokedexImport);

const pokeApi: PokeApi = new PokedexImport.Pokedex();

////////////////////

const pictureBaseUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

/**
 *
 * @param pokemonDataPoint the result-entries as returned by the v2/pokemon/ collection endpoint
 * @returns a minimal pokemon or undefined if parsing failed
 */
function parsePokemonListEntry(
  pokemonDataPoint: PokemonListEntry
): PokemonMinimal | undefined {
  // url e.g. "https://pokeapi.co/api/v2/pokemon/12/"
  const id = parseInt(pokemonDataPoint.url.slice(34, -1));
  if (isNaN(id)) {
    console.error("Parsing failed for: ", pokemonDataPoint);
    return undefined;
  } else {
    const pokemon: PokemonMinimal = {
      id: id,
      name: pokemonDataPoint.name,
      url: new URL(pokemonDataPoint.url),
      picture: new URL(pictureBaseUrl + id + ".png"),
    };
    return pokemon;
  }
}

export function getFullPokemonsList(): Promise<Array<PokemonMinimal>> {
  return pokeApi.getPokemonsList({ limit: -1 }).then(resp => {
    console.log("pokeapi: ", resp);
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

export default pokeApi;

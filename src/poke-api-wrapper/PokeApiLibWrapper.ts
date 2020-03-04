import {
  PokemonListEntry,
  PokemonDetails,
  PokemonSpecies,
  EvolutionChain,
} from "./PokeApiRawDataTypes";

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

const pokeApi: PokeApi = new PokedexImport.Pokedex();

export default pokeApi;

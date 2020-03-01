//TODO turn me into a `.d.ts`-file
declare class PokeApi {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function require(path: string): { Pokedex: any };
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PokedexImport = require("pokeapi-js-wrapper");
console.log("Pokedex: ", PokedexImport);

const pokedex: PokeApi = new PokedexImport.Pokedex();

export default pokedex;

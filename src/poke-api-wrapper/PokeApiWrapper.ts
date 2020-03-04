import {
  Ability,
  Move,
  PokemonDetailed,
  PokemonMinimal,
  BaseStatBlock,
  EvolutionTree,
  Type,
} from "../model/Pokemon";
import {
  PokemonDetails,
  PokemonSpecies,
  EvolutionChain,
} from "./PokeApiRawDataTypes";
import {
  parsePokemonListEntry,
  parseNamedRessourceUrl,
  minLevelLearned,
  canBeLearnedFromLevelling,
  parseBaseStats,
  parseEvolutionTree,
  parseEvolvesTo,
  toPokemonMinimal,
} from "./ParsingUtils";
import { wrapPromise, SuspenseResource } from "../utils";
import pokeApi from "./PokeApiLibWrapper";

////////////////////

export function getFullPokemonsList(): Promise<Array<PokemonMinimal>> {
  return pokeApi.getPokemonsList({ limit: -1 }).then(resp => {
    if (resp && resp.results) {
      // parse datapoints and pass on those parsing successfully
      const allPokemon: Array<PokemonMinimal> = resp.results
        .map(parsePokemonListEntry)
        // Filter out the parsing failures and all pokemon with an ID >= 10k
        // IDs >= 10k are reserved for pokemon style-variants, that
        // won't have proper detail entries in `/v2/pokemon/:id`.
        // Also, for many of them no image exists.
        .filter(p => p && p.id < 10000) as Array<PokemonMinimal>;
      return allPokemon;
    } else {
      return [];
    }
  });
}

const fullPokemonListResource:
  | undefined
  | SuspenseResource<Array<PokemonMinimal>> = undefined;
/**
 * Returns the suspense-resource that is loading the full pokemon
 * list.
 */
export function getFullPokemonsListResource(): SuspenseResource<
  Array<PokemonMinimal>
> {
  if (fullPokemonListResource) {
    return fullPokemonListResource;
  } else {
    return wrapPromise(getFullPokemonsList());
  }
}

////////////////////

export function getPokemonDetailsByName(
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

  // would like to use async-await here; can't due to an build-setup prob, potentially
  // related to the one expored here: <https://github.com/babel/babel/issues/8829>,
  // as replacing async-await with its desugared, promise-based version fixed the issue.
  // babel isn't a direct but an indirect dependency at the time of writing.
  // TODO get async-await working
  const pokemonP = Promise.all([detailsP, speciesP, evolutionChainP]).then(
    ([details, species, evolutionChain]) => {
      const minimalPokemon: PokemonMinimal = toPokemonMinimal(
        details.id,
        details.name
      );
      const abilities: Array<Ability> = details.abilities.map(a =>
        parseNamedRessourceUrl(a.ability)
      );
      const allMoves: Array<Move> = details.moves
        .map(m => parseNamedRessourceUrl(m.move))
        .sort();
      const movesLearnedViaLevelUp = details.moves
        .filter(canBeLearnedFromLevelling)
        .sort((a, b) => minLevelLearned(a) - minLevelLearned(b))
        .map(m => ({
          ...parseNamedRessourceUrl(m.move),
          minLevelLearned: minLevelLearned(m),
        }));
      const types: Array<Type> = details.types.map(t =>
        parseNamedRessourceUrl(t.type)
      );
      const baseStats: BaseStatBlock = parseBaseStats(details);

      // names in different languages
      const translatedNames: Map<string, string> = new Map();
      species.names.forEach(n => {
        translatedNames.set(n.language.name, n.name);
      });

      const evolutionTree: EvolutionTree = parseEvolutionTree(
        evolutionChain.chain
      );
      const evolvesTo: Array<string> = parseEvolvesTo(
        details.name,
        evolutionChain.chain
      );

      const pokemon: PokemonDetailed = {
        ...minimalPokemon,
        abilities,
        moves: allMoves,
        movesViaLevelUp: movesLearnedViaLevelUp,
        types,
        baseStats,
        translatedNames,
        inEvolutionTree: evolutionTree,
        possibleEvolutions: evolvesTo,
        order: details.order,
      };
      return pokemon;
    }
  );
  return pokemonP;
}

const pokemonDetailsResources = new Map<
  string,
  SuspenseResource<PokemonDetailed>
>();
/**
 * Returns the suspense-resource that will load the given pokemon's
 * detail information or has already loaded it.
 * @param name
 */
export function getPokemonDetailsResourceByName(
  name: string
): SuspenseResource<PokemonDetailed> {
  if (pokemonDetailsResources.has(name)) {
    return pokemonDetailsResources.get(name) as SuspenseResource<
      PokemonDetailed
    >;
  } else {
    const resource = wrapPromise(getPokemonDetailsByName(name));
    pokemonDetailsResources.set(name, resource);
    return resource;
  }
}

////////////////////

export default pokeApi;

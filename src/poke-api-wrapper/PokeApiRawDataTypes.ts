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
  moves: Array<UnparsedMove>;
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
export interface UnparsedMove {
  move: NamedResource;
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: NamedResource;
  }>;
}

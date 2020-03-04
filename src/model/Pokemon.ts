export interface PokemonMinimal {
  id: number; // TODO drop me?; name is unique. also id != order. and pokedex-entry-nr varies by game.
  name: string; //english
  url: URL; // api-url
  picture: URL;
}

export interface PokemonDetailed extends PokemonMinimal {
  /**
   * Ability (Japanese: 特性 ability) is a game mechanic introduced in Generation III that provides a passive effect in battle or in the overworld. Individual Pokémon may have only one Ability at a time.
   * source: <https://bulbapedia.bulbagarden.net/wiki/Ability>
   */
  abilities: Array<Ability>;
  types: Array<Type>; // technically it's Type | [Type, Type]
  //orderNumber: string // == id
  baseStats: BaseStatBlock;
  inEvolutionTree: EvolutionTree;
  possibleEvolutions: Array<string>;
  moves: Array<Move>;
  movesViaLevelUp: Array<MoveViaLevelUp>;
  order: number;
  translatedNames: Map<string, string>; // language -> name
  //   games: string; // would like to have this in minimal somehow, as the minimal info's used in the overview
}

export interface BaseStatBlock {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  /*
   * the following two exist on the list of stats but,
   * not on pokemon entries leading to the assumption
   * that there's no base-stats for it.
   */
  // accuracy: number;
  // evasion: number;
}

export interface EvolutionTree {
  name: string;
  evolvesTo: Array<EvolutionTree>; // empty array for leafs
}

export interface NamedUrlResource {
  name: string;
  url: URL;
}

export type Ability = NamedUrlResource;
export type Move = NamedUrlResource;
export type Type = NamedUrlResource;

export interface MoveViaLevelUp extends Move {
  minLevelLearned: number;
}

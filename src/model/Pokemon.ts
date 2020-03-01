export interface PokemonMinimal {
  id: number;
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
  type: Array<Type>; // technically it's Type | [Type, Type]
  //orderNumber: string // == id
  stats: string;
  possibleEvolutions: string;
  moves: Array<Move>;
  //   games: string; // would like to have this in minimal somehow, as the minimal info's used in the overview
}

export interface Ability {
  name: string;
  url: URL;
}
export interface Move {
  // use type-decl instead of interface? does compiler check correct usage then?
  name: string;
  url: URL;
  // type: Type gained via move's detail page
}

export interface Type {
  name: string;
  url: URL;
}

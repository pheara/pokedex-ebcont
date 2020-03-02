/* eslint-disable react/prop-types */
import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetailsResourceByName } from "./PokeApiWrapper";
import { capitalizeFirstLetter } from "./utils";
import { PokemonDetailed } from "./model/Pokemon";

export const PokemonDetailsPure: FunctionComponent<{
  pokemon: PokemonDetailed;
}> = ({ pokemon }) => {
  return (
    <React.Fragment>
      <h1>{capitalizeFirstLetter(name)}</h1>
      {pokemon.types.map(t => (
        <p key={t.name}>{t.name}</p>
      ))}
    </React.Fragment>
  );
};
const PokemonDetails: FunctionComponent = () => {
  const { name } = useParams();
  if (!name) {
    throw new Error("Missing pokemon-name in the URL.");
  }
  const resource = getPokemonDetailsResourceByName(name as string);
  const details = resource.read();

  return <PokemonDetailsPure pokemon={details} />;
};

export default PokemonDetails;

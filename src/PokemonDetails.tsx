import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetailsResourceByName } from "./PokeApiWrapper";
import { capitalizeFirstLetter } from "./utils";

const PokemonDetails: FunctionComponent = () => {
  const { name } = useParams();
  const resource = getPokemonDetailsResourceByName(name);
  const details = resource.read();

  return (
    <React.Fragment>
      <h1>{capitalizeFirstLetter(name)}</h1>
      {details.types.map(t => (
        <p key={t.name}>{t.name}</p>
      ))}
    </React.Fragment>
  );
};

export default PokemonDetails;

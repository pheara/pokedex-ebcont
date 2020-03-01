import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

const PokemonDetails: FunctionComponent = () => {
  const { name } = useParams();
  return <p>wip details for {name}</p>;
};

export default PokemonDetails;

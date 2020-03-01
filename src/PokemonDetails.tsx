import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";

const PokemonDetails: FunctionComponent = () => {
  const { id } = useParams();
  return <p>wip details for #{id}</p>;
};

export default PokemonDetails;

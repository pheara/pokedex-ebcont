/* eslint-disable react/prop-types */
import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetailsResourceByName } from "../poke-api-wrapper/PokeApiWrapper";
import { capitalizeFirstLetter } from "../utils";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import {
  PokemonDetailed,
  NamedUrlResource,
  MoveViaLevelUp,
  Move,
  BaseStatBlock,
} from "../model/Pokemon";

import { StatBlock } from "./StatBlock";

function renderStrDetailList(list: Array<string>): string {
  if (list.length <= 0) {
    return "None";
  } else {
    return list.map(str => capitalizeFirstLetter(str)).join(", ");
  }
}
function renderResDetailList(list: Array<NamedUrlResource>): string {
  return renderStrDetailList(list.map(res => res.name));
}

function renderMovesViaLevelling(moves: Array<MoveViaLevelUp>): string {
  return renderStrDetailList(
    moves.map(mv => `${mv.name} (${mv.minLevelLearned})`)
  );
}

function renderPossibleMoves(moves: Array<Move>): string {
  return renderStrDetailList(moves.map(mv => mv.name).sort());
}

const SimpleDetailsListItem: FunctionComponent<{
  title: string;
  body: string;
}> = ({ title, body }) => {
  return (
    <ListItem>
      <section>
        <ListItemText
          //   primary={
          //     <Typography variant="overline" component="h2">
          //       {title}
          //     </Typography>
          //   }
          //   secondary={<Typography variant="body1">{body}</Typography>}
          primary={
            <Typography variant="body1" component="h2">
              {title}
            </Typography>
          }
          secondary={body}
          // primary={<Typography variant="h6">{title}</Typography>}
          // secondary={<Typography variant="body2">{body}</Typography>}
        ></ListItemText>
      </section>
    </ListItem>
  );
};

const BaseStatsItem: FunctionComponent<{
  baseStats: BaseStatBlock;
}> = ({ baseStats }) => {
  return (
    <ListItem>
      <ListItemText
        disableTypography
        primary={
          <Typography variant="body1" component="h2">
            {/* <Typography variant="overline" component="h2"> */}
            BaseStats
          </Typography>
        }
        secondary={<StatBlock baseStats={baseStats} />}
      />
    </ListItem>
  );
};

export const PokemonDetailsPure: FunctionComponent<{
  pokemon: PokemonDetailed;
}> = ({ pokemon }) => {
  return (
    <React.Fragment>
      <List>
        <BaseStatsItem baseStats={pokemon.baseStats} />
        <Divider />
        <SimpleDetailsListItem title="Order" body={"#" + pokemon.order} />
        <Divider />
        <SimpleDetailsListItem
          title="Types"
          body={renderResDetailList(pokemon.types)}
        />
        <Divider />
        <SimpleDetailsListItem
          title="Evolutions"
          body={renderStrDetailList(pokemon.possibleEvolutions)}
        />
        <Divider />
        <SimpleDetailsListItem
          title="Abilities"
          body={renderResDetailList(pokemon.abilities)}
        />
        <Divider />
        <SimpleDetailsListItem
          title="Moves learned by levelling"
          body={renderMovesViaLevelling(pokemon.movesViaLevelUp)}
        />
        <Divider />
        <SimpleDetailsListItem
          title="All possible moves"
          body={renderPossibleMoves(pokemon.moves)}
        />
      </List>
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

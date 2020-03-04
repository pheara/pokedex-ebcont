/* eslint-disable react/prop-types */
import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetailsResourceByName } from "./PokeApiWrapper";
import { capitalizeFirstLetter } from "./utils";
import {
  PokemonDetailed,
  NamedUrlResource,
  MoveViaLevelUp,
  Move,
  BaseStatBlock,
} from "./model/Pokemon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Divider";

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
      <ListItemText
        // primary={<Typography variant="overline">{title}</Typography>}
        // secondary={<Typography variant="body1">{body}</Typography>}
        primary={title}
        secondary={body}
        // primary={<Typography variant="h6">{title}</Typography>}
        // secondary={<Typography variant="body2">{body}</Typography>}
      ></ListItemText>
    </ListItem>
  );
};

// const StatBlock: FunctionComponent<{
//     stats: BaseStatBlock;
// }> => ({ stats }) => {
//     return (<p>foo</p>);
// }

export const PokemonDetailsPure: FunctionComponent<{
  pokemon: PokemonDetailed;
}> = ({ pokemon }) => {
  return (
    <React.Fragment>
      <List>
        <ListItem>
          <Grid container="true" spacing={3}>
            <Grid item="true" xs={4}>
              <div>{pokemon.baseStats.hp}</div>
            </Grid>
            <Grid item={1} xs={4}>
              {pokemon.baseStats.attack}
            </Grid>
            <Grid item={1} xs={4}>
              {pokemon.baseStats.defense}
            </Grid>
            <Grid item xs={4}>
              {pokemon.baseStats.specialAttack}
            </Grid>
            <Grid item xs={4}>
              {pokemon.baseStats.specialDefense}
            </Grid>
            <Grid item xs={4}>
              {pokemon.baseStats.speed}
            </Grid>
          </Grid>
        </ListItem>

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

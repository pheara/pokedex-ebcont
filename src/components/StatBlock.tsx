/* eslint-disable react/prop-types */
import React, { FunctionComponent } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { BaseStatBlock } from "../model/Pokemon";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    gridContainer: {
      flexGrow: 1,
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr",
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(2),
      //   justifyItems: "center",
      justifyItems: "start",
      alignItems: "center",
    },
    statTitle: {
      color: theme.palette.text.secondary,
    },
    statValue: {
      color: theme.palette.text.primary,
      //   color: text.secondary,
    },
  });
});

export const StatItem: FunctionComponent<{
  title: string;
  value: number;
}> = ({ title, value }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="body2" className={classes.statTitle}>
        {title}
      </Typography>
      <Typography variant="body2" className={classes.statValue}>
        {value}
      </Typography>
    </div>
  );
};

export const StatBlock: FunctionComponent<{
  baseStats: BaseStatBlock;
}> = ({ baseStats }) => {
  const classes = useStyles();
  return (
    <div className={classes.gridContainer}>
      <StatItem title="HP" value={baseStats.hp} />
      <StatItem title="Attack" value={baseStats.attack} />
      <StatItem title="Defense" value={baseStats.defense} />
      <StatItem title="Sp. Atk" value={baseStats.specialAttack} />
      <StatItem title="Sp. Def" value={baseStats.specialDefense} />
      <StatItem title="Speed" value={baseStats.speed} />
    </div>
  );
};

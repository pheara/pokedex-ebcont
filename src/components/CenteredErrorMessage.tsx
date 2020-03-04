import React, { FunctionComponent } from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((/*theme: Theme*/) =>
  createStyles({
    centeredErrorMessage: {
      display: "block",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      textAlign: "center",
    },
  }));

const CenteredErrorMessage: FunctionComponent<{ label: string }> = ({
  // eslint-disable-next-line react/prop-types
  label,
}) => {
  const classes = useStyles();

  return (
    <Typography variant="body1" className={classes.centeredErrorMessage}>
      {label}
    </Typography>
  );
};

export default CenteredErrorMessage;

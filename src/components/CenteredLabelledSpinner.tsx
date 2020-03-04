import React, { FunctionComponent } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    spinnerContainer: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    spinnerLabel: {
      marginTop: theme.spacing(2),
      textAlign: "center",
    },
  })
);

const CenteredLabelledSpinner: FunctionComponent<{ label: string }> = ({
  // eslint-disable-next-line react/prop-types
  label,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.spinnerContainer}>
      <CircularProgress />
      <Typography variant="body1" className={classes.spinnerLabel}>
        {label}
      </Typography>
    </Box>
  );
};

export default CenteredLabelledSpinner;

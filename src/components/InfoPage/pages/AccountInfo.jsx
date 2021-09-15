import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function AccountInfo() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={6} justifyContent="center" alignItems="center">
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h2">
            Account
          </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6} sm={6} justifyContent="center" alignItems="center">
          <Typography>
              In this page you are able to view your current available funds and increase them if you want or need. As this
              application is for practice, we want you to be able to make up for any mistakes, or set your funding to whatever
              you feel is practical or fun. You can also choose to delete your account. Please note, if your account is deleted
              there is no way to recover it. 
          </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
    </div>
  );
}
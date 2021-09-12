import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Grid, Typography, Container } from '@material-ui/core';
import round from '../../round';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} maxWidth="md">
        <Grid item xs={12}>
          <Typography variant="h2">Welcome, {user.username}!</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Your ID is: {user.id}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Your portfolio balance is: ${round(user.accountBalance)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Your available funds are: ${round(user.availableBalance)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <LogOutButton className="btn" />
        </Grid>
      </Grid>
    </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
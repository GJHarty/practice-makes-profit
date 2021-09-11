import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  return (
    <Grid container spacing={2} maxWidth="md">
      <Typography variant="h2">Welcome, {user.username}!</Typography>
      <p>Your ID is: {user.id}</p>
      <p>Your portfolio balance is: ${(Math.round(user.accountBalance * 100) / 100).toFixed(2)}</p>
      <p>Your available funds are: ${(Math.round(user.availableBalance * 100) / 100).toFixed(2)}</p>
      
      <LogOutButton className="btn" />
    </Grid>
      

  );
}

// this allows us to use <App /> in index.js
export default UserPage;
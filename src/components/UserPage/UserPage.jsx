import React, { useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Grid, Typography, Container, Button, TextField } from '@material-ui/core';
import round from '../../round';
import { useDispatch } from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [fundsToAdd, setFundsToAdd] = useState(0);
  const [newUsername, setNewUsername] = useState('');

  /* const updateUsername = () => {
    console.log('updating username');
    dispatch({
      type: 'UPDATE_USERNAME',
      payload: newUsername
    })
  } */

  const addFunds = () => {
    console.log('Adding Funds');
    dispatch({
      type: 'INCREASE_BALANCES',
      payload: {
        totalCost: fundsToAdd,
        availableBalance: user.availableBalance,
        operator: 'increase',
    }
    });
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
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
        {/* <Grid item xs={12}>
          <form noValidate autoComplete="off" onChange={(event) => setNewUsername(event.target.value)}>
            <Button variant="contained" color="primary" onClick={updateUsername}>
              Update Username
            </Button>
            <TextField id="standard-basic" label="Enter new username" /> 
          </form>
        </Grid> */}
        <Grid item xs={12}>
          <form noValidate autoComplete="off" onChange={(event) => setFundsToAdd(Number(event.target.value))}>
            <Button variant="contained" color="primary" onClick={addFunds}>
              Increase Available Funds
            </Button>
            &emsp;
            &emsp;
            <TextField id="standard-basic" label="Enter amount" /> 
          </form>
        </Grid>
        <Grid item xs={12}>
          <LogOutButton className="btn" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary">
            Delete Account
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
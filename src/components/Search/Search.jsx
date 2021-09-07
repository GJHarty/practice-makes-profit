import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SearchPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const user = useSelector((store) => store.user);
  
  const [heading, setHeading] = useState('Search Page');
  const [search, setSearch] = useState('');

  const classes = useStyles();

  const searchOnClick = () => {
    console.log('searching for:', search);
  }
  
  return (
    <div>
      <h2>{heading}</h2>
      <h3>Available Balance: ${(Math.round(user.availableBalance * 100) / 100).toFixed(2)}</h3>
      <div>
        <Container maxWidth="md" style={{ backgroundColor: '#ffffff', height: '170vh'}}>
          <h1>Search</h1>
          <form className={classes.root} noValidate autoComplete="off" onChange={(event) => setSearch(event.target.value)}>
              <TextField id="standard-basic" label="Enter Ticker" /> 
          </form>
          <Button variant="contained" color="primary" onClick={searchOnClick}>Submit</Button>
        </Container>
      </div>
    </div>
  );
}


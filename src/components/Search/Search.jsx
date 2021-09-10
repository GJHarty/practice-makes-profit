import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Button, makeStyles, Grid } from '@material-ui/core';
import StockDisplay from '../StockDisplay/StockDisplay';
import axios from 'axios';
import round from '../../round';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SearchPage() {
  const store = useSelector((store) => store);
  const user = useSelector((store) => store.user);
  const stockData = useSelector(store => store.search);
  const history = useSelector(store => store.history);

  const classes = useStyles();
  const dispatch = useDispatch();
  
  const [heading, setHeading] = useState('Search Page');
  const [search, setSearch] = useState('');
  const [symbolSearch, setSymbolSearch] = useState('');
  const [isStockDisplayed, setIsStockDisplayed] = useState(false);
  const [symbolResults, setSymbolResults] = useState([]);

  // we need to grab just a single stock on the search page 
  const setStockDetails = () => {
    dispatch({
        type: 'FETCH_STOCK_DETAILS',
        payload: search,
    });
    dispatch({
      type: 'FETCH_STOCK_HISTORY',
      payload: search
    })
  }

  const searchOnClick = () => {
    console.log('searching for:', search);
    setStockDetails();
    setIsStockDisplayed(true);
  }

  const searchForSymbol = () => {
    console.log('searching for symbol');
    axios.get('/api/lookup', {params: {q: symbolSearch}})
      .then(res => {
        console.log('api res', res.data);
        setSymbolResults(res.data);
        console.log('symbols', symbolResults);
      })
      .catch(err => {
        console.log('error getting to server', err);
      })
  }

  return (
    <div>
      <h3 style={{float: 'right'}}>Available Balance: ${round(user.availableBalance)}</h3>
      <div>
        <Container maxWidth="md" style={{ backgroundColor: '#ffffff', height: '170vh'}}>
          <h1>Search</h1>
          <form className={classes.root} noValidate autoComplete="off" onChange={(event) => setSearch(event.target.value)}>
              <TextField id="standard-basic" label="Enter Ticker" /> 
          </form>
          <Button variant="contained" color="primary" onClick={searchOnClick}>Submit</Button>
          <form className={classes.root} noValidate autoComplete="off" onChange={(event) => setSymbolSearch(event.target.value)}>
              <TextField id="standard-basic" label="Enter Company Name" /> 
          </form>
          <Button variant="contained" color="primary" onClick={searchForSymbol}>Submit</Button>
          {symbolResults && 
            <Grid container spacing={4}>
            {symbolResults.map(result => (
              <Grid item xs={4} key={result.symbol}>
                <p>Name: {result.description} </p>
                <p>Symbol: <Button variant="outlined" color="default" >{result.symbol}</Button> </p>
              </Grid>
            ))}
            </Grid>
          }
          <div>
          {isStockDisplayed &&
            <StockDisplay 
              stockSymbol={search}
              classes={classes}
              stockData={stockData}
              displayType="search"
              stockHistory={history}
            /> 
          }
          </div>
        </Container>
      </div>
    </div>
  );
}


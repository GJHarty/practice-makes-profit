import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Button, makeStyles, Grid, Typography } from '@material-ui/core';
import StockDisplay from '../StockDisplay/StockDisplay';
import axios from 'axios';

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

  const cardSearch = (symbol) => {
    setSearch(symbol);
    console.log('card search', symbol);
      dispatch({
        type: 'FETCH_STOCK_DETAILS',
        payload: symbol,
    });
    dispatch({
      type: 'FETCH_STOCK_HISTORY',
      payload: symbol,
    });
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
      
      <div>
        <Container maxWidth="md" style={{ backgroundColor: '#ffffff', height: '95vh'}}>
          <Grid container maxwidth="md" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h2">{heading}</Typography>
            </Grid>
            <Grid item xs={6}>
              <form className={classes.root} noValidate autoComplete="off" onChange={(event) => setSearch(event.target.value)}>
                <TextField id="standard-basic" label="Enter Ticker" /> 
              </form>
              <Button variant="contained" color="primary" onClick={searchOnClick}>Submit</Button>
            </Grid>
            <Grid item xs={6}>
              <form className={classes.root} noValidate autoComplete="off" onChange={(event) => setSymbolSearch(event.target.value)}>
                <TextField id="standard-basic" label="Enter Company Name" /> 
              </form>
              <Button variant="contained" color="primary" onClick={searchForSymbol}>Submit</Button>
            </Grid>
            <Grid item xs={12}>
              {isStockDisplayed &&
                <StockDisplay 
                  stockSymbol={search}
                  classes={classes}
                  stockData={stockData}
                  displayType="search"
                  stockHistory={history}
                /> 
              }
            </Grid>
            <Grid item xs={12}>
              {symbolResults && 
                <Grid container spacing={4}>
                {symbolResults.map(result => (
                  <Grid item xs={4} key={result.symbol}>
                    <p>Name: {result.description} </p>
                    <p>Symbol: 
                      <Button 
                        variant="outlined" 
                        color="default" 
                        
                        onClick={() => cardSearch(result.symbol)}
                      >
                        {result.symbol}
                      </Button>  
                    </p>
                  </Grid>
                ))}
                </Grid>
              }
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}


import { Container, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import StockDisplay from '../StockDisplay/StockDisplay';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));



export default function Watchlist() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const detailedWatchlist = useSelector(store => store.detailedWatchlist);
  const dispatch = useDispatch();
  const [heading, setHeading] = useState('Watchlist');
  const classes = useStyles();

  useEffect(() => {
    dispatch({
        type: 'CLEAR_DETAILED_WATCHLIST'
      });
    dispatch({
      type: 'FETCH_WATCHLIST',
    });
  }, []);


  return (
    <div>
      <h2>{heading}</h2>
      <Container maxWidth="md" style={{ backgroundColor: '#ffffff', height: '170vh'}}>
      {detailedWatchlist.map(stock => (
        <StockDisplay 
          key={stock.stockSymbol}
          stockSymbol={stock.stockSymbol}
          classes={classes}
          stockData={stock.data}
          stockHistory={stock.history}
          displayType="watchlist"
        />
      ))}
      </Container>
    </div>
  );
}


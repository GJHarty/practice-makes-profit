import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Container, makeStyles, Typography } from '@material-ui/core';
import StockDisplay from '../StockDisplay/StockDisplay';
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

export default function Portfolio() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const user = useSelector((store) => store.user);
  const detailedPortfolio = store.detailedPortfolio;
  const dispatch = useDispatch();
  const classes = useStyles();

  const [heading, setHeading] = useState('Portfolio');
  let totalBalance = user.availableBalance;

  useEffect(() => {
    dispatch({
        type: 'CLEAR_DETAILED_PORTFOLIO'
      });
    dispatch({
      type: 'FETCH_PORTFOLIO',
    });
  }, []);
  
  // logic for creating a total balance including holdings. not working atm
  useEffect(() => {
    for (let holding of detailedPortfolio) {
      totalBalance += holding.dbData.totalHoldings;
    }
    return totalBalance
  }, [user])
  

  return (
    <div>
      <Container maxWidth="md" style={{ backgroundColor: '#ffffff', height: '170vh'}}>
        <Typography variant="h3">{heading}</Typography>
        <Typography variant="h4">Available Balance: ${round(user.availableBalance)}</Typography>
        <Typography variant="h4">Total Balance: ${round(totalBalance)}</Typography>
        {detailedPortfolio.map(stock => (
          <StockDisplay 
            key={stock.data.c}
            stockSymbol={stock.stockSymbol}
            classes={classes}
            stockData={stock.data}
            stockHistory={stock.history}
            dbData={stock.dbData}
            displayType="portfolio"
          />
        ))}
      </Container>
    </div>
  );
}

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
  const portfolio = store.portfolio;
  // sorting our detailedPortfolio so that we can binf
  const detailedPortfolio = store.detailedPortfolio.sort((a,b) => (a.stockSymbol > b.stockSymbol) ? 1 : ((b.stockSymbol > a.stockSymbol) ? -1 : 0));
  const dispatch = useDispatch();
  const classes = useStyles();

  const [heading, setHeading] = useState('Portfolio');

  let portfolioBalance = 0;
  if (detailedPortfolio.length === portfolio.length) {
    for (let i = 0; i < portfolio.length; i++) {
      
      portfolioBalance += (portfolio[i].totalQuantity * detailedPortfolio[i].data.c)
      
    }
  }

  let roi = round((portfolioBalance + user.availableBalance) / user.accountBalance * 100);

  useEffect(() => {
    dispatch({
        type: 'CLEAR_DETAILED_PORTFOLIO'
      });
    dispatch({
      type: 'FETCH_PORTFOLIO',
    });
  }, []);
  
  

  return (
    <div>
      <Container maxWidth="md" style={{ backgroundColor: '#ffffff', height: '170vh'}}>
        <Typography variant="h2">{heading}</Typography>
        {portfolio.length === detailedPortfolio.length && 
        <>
        <Typography variant="h4">Portfolio Value: ${round(portfolioBalance)}</Typography>
        <Typography variant="h4">Base Funds: ${user.accountBalance}</Typography>
        <Typography variant="h4">Total Holdings: ${round(portfolioBalance + user.availableBalance)}</Typography>
        <Typography variant="h4">Return on Investments: {roi}%</Typography>
        </>
        }
        {detailedPortfolio.map(stock => (
          <StockDisplay 
            key={stock.data.c}
            stockSymbol={stock.stockSymbol}
            classes={classes}
            stockData={stock.data}
            stockHistory={stock.history}
            dbData={stock.dbData}
            transactions={stock.transactions}
            displayType="portfolio"
          />
        ))}
      </Container>
    </div>
  );
}

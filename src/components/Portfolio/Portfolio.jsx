import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Container, makeStyles } from '@material-ui/core';
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

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
export default function Portfolio() {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const detailedPortfolio = store.detailedPortfolio;
  const dispatch = useDispatch();
  const classes = useStyles();

  const [heading, setHeading] = useState('Portfolio');

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
        <h2>{heading}</h2>
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

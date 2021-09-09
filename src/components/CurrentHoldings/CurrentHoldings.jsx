import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Container, makeStyles } from '@material-ui/core';

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
export default function CurrentHoldings(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Current Holdings');
  let currentHoldings = ['AAPL']


  return (
    <div>
      <Container maxWidth="md" style={{ backgroundColor: '#ffffff', height: '170vh'}}>
        <h2>{heading}</h2>
      {/* {currentHoldings.map(stock => (
        <StockDisplay 
          key={stock.stockSymbol}
          stockSymbol={stock.stockSymbol}
          classes={classes}
          stockData={stock.data}
          stockHistory={stock.history}
          displayType="currentHoldings"
        />
      ))} */}
      </Container>
    </div>
  );
}

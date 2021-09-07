import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Line} from 'react-chartjs-2';
import { Button } from '@material-ui/core';

export default function HistoryGraph({ stockSymbol }) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const history = useSelector(store => store.history);
  const dispatch = useDispatch();

  const closeData = history.c;
  
  const createLabels = () => {
    let emptyLabel = [];
    for (let i = 0; i < closeData.length; i++) {
        emptyLabel.push(i+1);
    };
    return emptyLabel;
  };
  
  const ctx = {
    labels: createLabels(),
    datasets: [
      {
        label: 'Closing Price',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: closeData,
      }
    ]
  };

  const updateGraph = () => {
      console.log('trying to update graph');
    /* dispatch({
        type: 'FETCH_STOCK_HISTORY',
        payload: {
            symbol: stockSymbol,
        }
    }); */
  };

  return (
    <>
        <Line
            data={ctx}
            options={{
                title:{
                    display:true,
                    text:'Closing Prices for the last 21 days',
                    fontSize: 20
                },
                legend:{
                    display: true,
                    position:'right'
                }
            }}
        />
        <p>Choose Timeframe:</p>
        <Button 
            variant="outlined" 
            color="default" 
            value={604800}
            onClick={updateGraph}
        >
            Week
        </Button>
        <Button 
            variant="outlined" 
            color="default" 
            value="month" 
            onClick={updateGraph}
        >
            Month
        </Button>
        <Button 
            variant="outlined" 
            color="default" 
            value="year" 
            onClick={updateGraph}
        >
            Year
        </Button>
    </>
  );
}
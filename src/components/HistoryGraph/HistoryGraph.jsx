import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';
import { defaults } from 'react-chartjs-2';




export default function HistoryGraph({ stockSymbol, stockHistory }) {
  const dispatch = useDispatch();
  // Disable animating charts by default.
  defaults.animation = false;
  useEffect(() => {
    dispatch({
      type: 'FETCH_STOCK_HISTORY',
      payload: stockSymbol
    });
  }, []);

  const createLabels = () => {
    let emptyLabel = [];
    for (let i = stockHistory.length; i > 0; i--) {
      emptyLabel.push(i);
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
        backgroundColor: 'rgb(7,170,158)',
        radius: 3,
        pointStyle: 'rect',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: stockHistory,
        options: {
          scales: {
              yAxes: [{
                  ticks: {
                      // Include a dollar sign in the ticks
                      callback: function(emptyLabel) {
                          return '$' + value.toFixed(decimals);
                      }
                  }
              }]
          }
      }
      }
    ]
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
    </>
  );
}
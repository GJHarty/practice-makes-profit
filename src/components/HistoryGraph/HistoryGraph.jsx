import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';


export default function HistoryGraph({ stockSymbol, stockHistory }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_STOCK_HISTORY',
      payload: stockSymbol
    });
  }, []);
  
  const createLabels = () => {
    let emptyLabel = [];
    for (let i = 0; i < stockHistory.length; i++) {
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
        data: stockHistory,
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
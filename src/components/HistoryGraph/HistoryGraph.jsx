import React from 'react';
import { useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';


export default function HistoryGraph({ stockSymbol }) {
  const history = useSelector(store => store.history);

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
import React from 'react';
import video from './video/App.mp4';
import ReactPlayer from 'react-player';
import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SearchInfo() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={6} justifyContent="center" alignItems="center">
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h2">
            Search
          </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6} sm={6} justifyContent="center" alignItems="center">
          <Typography>
              On this page you will be able to enter in keywords or a specific ticker symbol in order to purchase a stock. 
              Try to keep your keyword searches short and simple. 
          </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">Search with Keywords</Typography>
          <Typography>
            On the left side is an input field where you can enter in a company name or any keywords you think might work if you
            don't have any tickers in mind. For example, if you wanted to buy stock from Apple, you can simply input "Apple" into 
            the search field and it will populate the company name and ticker symbol for that company. You can click on the ticker
            symbol in order to initiate a search. You can also search for keywords that are a little vague such as "bio" which may 
            produce more than one search result.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">Ticker Symbol Search</Typography>
          <Typography>
            If you know of a specific ticker symbol to search, simply input it into the field on the right and hit submit. If it
            is valid, a stock will populate with some useful information such as the price and the current days change.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">Stock Display</Typography>
          <Typography>
            If you want to see more information about the stock that has been populated, just click on it and it will expand to show
            the current day statistics and a graph showing the history of closing prices so you can easily see if it has been going up or down.
            There will also be two buttons: Watch and Buy. Clicking the watch button will add it to your watchlist which you can find more information
            about on the next page and clicking buy will show a pop-up where you can enter in a quantity to purchase. 
            Watch the video to the right for a visual demonstration.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <ReactPlayer url={video} width="50%" height="50%" controls={true} />
          </Typography>
        </Grid>
      </Grid>
    </div>  
  )
}
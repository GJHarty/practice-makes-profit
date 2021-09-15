import React from 'react';
import video from './video/watchlist.mp4';
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

export default function WatchlistInfo() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={6} justifyContent="center" alignItems="center">
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h2">
            Watchlist
          </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6} sm={6} justifyContent="center" alignItems="center">
          <Typography>
              Curious about a stock, but don't want to purchase it yet for any reason? Add it to the watchlist! This display is just 
              like what you will see on the search page, but instead of a watch button it will have a remove button for when you no
              longer want to see it on your watchlist. 
          </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            <ReactPlayer url={video} width="100%" height="100%" controls={true} />
          </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
    </div>
  );
}
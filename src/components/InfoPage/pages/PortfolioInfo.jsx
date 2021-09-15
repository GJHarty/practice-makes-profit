import { Grid, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import video from './video/portfolio.mp4';
import ReactPlayer from 'react-player';

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

export default function PortfolioInfo() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={6} >
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h2">
            Portfolio
          </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography>
              Here is where you can view all purchased stocks. The display will change a little bit depending on how many you own.
              You can expand the display and click on the tabs to navigate to different information. The default display will show
              your transaction history, but you can click to the other tabs in order to see the same information that was displayed 
              on the search page.
          </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">Sell</Typography>
          <Typography>
            A new button will populate which will let you sell any quantity of the shares you have. This works similar to the Buy
            button and will not let you sell more than you currently have purchased. If you sell all of your shares, a remove button
            will populate that will let you remove that stock form your portfolio. 
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">Remove</Typography>
          <Typography>
            This button will populate once you have no more shares to sell. This will permanently remove the stock from your portfolio
            including the transaction history, so be careful as there is no way to retrieve that information.
          </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <ReactPlayer url={video} width="100%" height="100%" controls={true} />
        </Grid>
        <Grid item xs={3}>
        </Grid>
      </Grid>
    </div>
  );
}
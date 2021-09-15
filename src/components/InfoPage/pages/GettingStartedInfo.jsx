import { Grid, Typography, makeStyles } from '@material-ui/core';
import React from 'react';

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

export default function GettingStartedInfo() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={6} justifyContent="center" alignItems="center">
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h2">
            Getting Started
          </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6} sm={6} justifyContent="center" alignItems="center">
          <Typography>
              Hello and welcome! This page is going to go over some of the information in Practice Makes Profit 
              that you may not know about before getting started. Please note you do not have to read everything listed here
              as you will be able to re-visit this page at any time. The tabs on the left side of this screen refer to each 
              of the pages you can visit above. These will explain how to use the application. Also posted at the top is your
              Accounts available balance which you can use up and replenish at any time. 
          </Typography>
        </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">What is a Stock?</Typography>
          <Typography>
            A stock (also known as equity) is a security that represents the ownership of a fraction of a corporation. 
            This entitles the owner of the stock to a proportion of the corporation's assets and profits equal to how much stock 
            they own. Units of stock are called "shares."
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h4">What is a Ticker Symbol?</Typography>
          <Typography>
            A stock symbol is a unique series of letters assigned to a security for trading purposes. Stocks listed 
            on the New York Stock Exchange (NYSE) can have four or fewer letters. Nasdaq-listed securities can have up to five 
            characters. Symbols are just a shorthand way of describing a company's stock, so there is no significant difference 
            between those that have three letters and those that have four or five. Stock symbols are also known as ticker symbols.
            Ex. Apple's ticker symbol is AAPL and Microsoft's ticker symbol is MSFT
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4">Where Should I Start?</Typography>
          <Typography>
            The first page you should visit on the application is Search. This is where you can go to look up names of companies, or
            search for specific ticker symbol if you already know of one that interests you. Head over to the search tab on the left to 
            see more!
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h4">How can I Learn More?</Typography>
          <Typography>
            A great tool to use to further your learning is <a href='https://www.investopedia.com/'>Investopedia</a>.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
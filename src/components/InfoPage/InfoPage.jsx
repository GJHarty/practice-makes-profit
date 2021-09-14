import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Grid} from '@material-ui/core';
import GettingStartedInfo from './pages/GettingStartedInfo';
import SearchInfo from './pages/SearchInfo';
import PortfolioInfo from './pages/PortfolioInfo';
import WatchlistInfo from './pages/WatchlistInfo';
import AccountInfo from './pages/AccountInfo';
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

export default function InfoPage() {
  const classes = useStyles();
  const [detailScreen, setDetailScreen] = useState('start');

  const openInfo = (value) => {
    setDetailScreen(value);
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={4}>
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Directory
        </ListSubheader>
      }
      className={classes.root}
    >
    
      <ListItem button onClick={() => openInfo('start')}>
        <ListItemIcon>
          <EmojiPeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Getting Started" />
      </ListItem>

      <ListItem button onClick={() => openInfo('search')}>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search" />
      </ListItem>

      <ListItem button onClick={() => openInfo('portfolio')}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Portfolio" />
      </ListItem>

      <ListItem button onClick={() => openInfo('watchlist')}>
        <ListItemIcon>
          <VisibilityIcon />
        </ListItemIcon>
        <ListItemText primary="Watchlist" />
      </ListItem>

      <ListItem button onClick={() => openInfo('account')}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
    </List>
      </Grid>
        <Grid item xs={8}>
          {detailScreen === 'start' &&
            <GettingStartedInfo />
          }
          {detailScreen === 'search' &&
            <SearchInfo />
          }
          {detailScreen === 'portfolio' &&
            <PortfolioInfo />
          }
          {detailScreen === 'watchlist' &&
            <WatchlistInfo />
          }
          {detailScreen === 'account' &&
            <AccountInfo />
          }
        </Grid>
    </Grid>
  );
}


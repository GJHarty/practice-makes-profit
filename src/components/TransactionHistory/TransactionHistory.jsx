import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { List, ListItem } from '@material-ui/core';
import round from '../../round';
import HistoryGraph from '../HistoryGraph/HistoryGraph';
import ChatDisplay from '../LabComponents/ChatDisplay/ChatDisplay';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TransactionHistory({
  transactions,
  stockData,
  stockSymbol,
  stockHistory
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function formatDate(date) {
    let d = new Date(date);
    return d.toLocaleDateString();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Transaction History" {...a11yProps(0)} />
          <Tab label="Current Day Values" {...a11yProps(1)} />
          <Tab label="History" {...a11yProps(2)} />
          <Tab label="Chat" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <List component="nav" aria-label="transaction history display">
        {transactions.map(item => (
            <ListItem key={item.id}>{item.isBoughtOrSold ? 'Buy' : 'Sell'} Quantity: {Math.abs(item.quantity)} Price: ${round(item.price) } Date: {formatDate(item.timestamp)}</ListItem>
        ))}
      </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List component="nav" aria-label="expanded stock info">
            <ListItem>
                High Price of the Day: ${round(stockData.h)}
            </ListItem>
            <ListItem>
                Low Price of the Day: ${round(stockData.l)}
            </ListItem>
            <ListItem>
                Opening Price: ${round(stockData.o)}
            </ListItem>
            <ListItem>
                Previous Day Closing Price: ${round(stockData.pc)}
            </ListItem>
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <HistoryGraph 
            stockSymbol={stockSymbol}
            stockHistory={stockHistory}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ChatDisplay 
          stockSymbol={stockSymbol}
        />
      </TabPanel>
    </div>
  );
}
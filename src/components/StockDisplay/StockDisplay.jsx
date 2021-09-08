import React from "react"
import { useState } from 'react';
import { Typography, List, ListItem, makeStyles, Grid, Button, Modal, TextField } from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { useDispatch, useSelector } from "react-redux";
import HistoryGraph from "../HistoryGraph/HistoryGraph";

const gridStyle = makeStyles((theme) => ({
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

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function StockDisplay({ stockSymbol, classes, stockData }) {
    // const stock = useSelector(store => store.search);
    const user = useSelector((store) => store.user);
    const gridClass = gridStyle();
    const modalClass = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [modalStyle] = useState(getModalStyle);
    const [quantity, setQuantity] = useState(0);

    const purchaseStock = () => {
        console.log('buying stock');
        dispatch({
            type: 'CREATE_PURCHASED_STOCK',
            payload: {
                symbol: stockSymbol,
                price: stock.c,
                quantity,
            },
        });
        handleClose();
    };

    const addToWatchlist = () => {
        console.log('Adding to watchlist');
        dispatch({
            type: 'CREATE_WATCHLISTED_STOCK',
            payload: {
                symbol: stockSymbol
            }
        });
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={modalClass.paper}>
          <h2 id="simple-modal-title">Purchase</h2>
          <div id="simple-modal-description">
            <p>Available Funds: ${user.availableBalance}</p>
            <p>Current/Market Stock Price: ${stockData.c}</p>
            <h3>Please select quantity</h3>
            <Grid container className={gridClass.root} spacing={2}>
                <Grid item xs={4}>
                    <p>Total Cost: ${quantity * stockData.c}</p>
                </Grid>
                <Grid item xs={4}>
                    <p>Remaining Balance: ${user.availableBalance - (quantity * stockData.c)}</p>
                </Grid>
                <Grid item xs={4}>
                    <TextField label="Quantity" value={quantity} onChange={event => setQuantity(event.target.value)}/>
                </Grid>
            </Grid>
          </div>
          <button onClick={purchaseStock}>Confirm</button>
        </div>
    );

    return (
        <React.Fragment>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    arie-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        {stockSymbol}  
                        Current Price: ${stockData.c} 
                        Day Change: {stockData.dp}%
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container className={gridClass.root} spacing={2}>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <List component="nav" aria-label="expanded stock info">
                                    <ListItem>
                                        High Price of the Day: ${stockData.h}
                                    </ListItem>
                                    <ListItem>
                                        Low Price of the Day: ${stockData.l}
                                    </ListItem>
                                    <ListItem>
                                        Opening Price: ${stockData.o}
                                    </ListItem>
                                    <ListItem>
                                        Previous Day Closing Price: ${stockData.pc}
                                    </ListItem>
                                </List>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <HistoryGraph 
                                    stockSymbol={stockSymbol}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={1}>
                                <Button variant="outlined" color="default" onClick={addToWatchlist}>Watch</Button>
                                <Button variant="contained" color="primary" onClick={handleOpen}>Buy</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </React.Fragment>
    )
}
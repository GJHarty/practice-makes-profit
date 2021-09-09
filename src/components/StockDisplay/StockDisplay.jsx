import React from "react"
import { useState } from 'react';
import { Typography, List, ListItem, makeStyles, Grid, Button } from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { useDispatch, useSelector } from "react-redux";
import HistoryGraph from "../HistoryGraph/HistoryGraph";
import { useEffect } from "react";
import round from "../../round";
import PurchaseModal from "../TransactionModals/PurchaseModal";

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

export default function StockDisplay({ 
    stockSymbol, 
    classes, 
    stockData, 
    displayType, 
    stockHistory, 
    dbData 
}) {
    const user = useSelector((store) => store.user);
    const gridClass = gridStyle();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [purchaseOpen, setPurchaseOpen] = useState(false);

    useEffect(() => {
        if (quantity > 0){
            setTotalCost(round(stockData.c * quantity));
        }   
    }, [quantity]);

    const purchaseStock = () => {
        console.log('buying stock');
        dispatch({
            type: 'CREATE_PURCHASED_STOCK',
            payload: {
                symbol: stockSymbol,
                price: stockData.c,
                quantity,
            },
        });
        dispatch({
            type: 'UPDATE_BALANCES',
            payload: {
                totalCost,
                availableBalance: user.availableBalance,
            }
        });
        handlePurchaseModalClose();
    };
    const handlePurchaseModalOpen = () => {
        setPurchaseOpen(true);
    }
    const handlePurchaseModalClose = () => {
        setPurchaseOpen(false);
    }

    const sellStock = () => {
        console.log('selling stock');
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

    const removeFromWatchlist = () => {
        console.log('removing from watchlist', stockSymbol);
        dispatch({
            type: 'DELETE_WATCHLISTED_STOCK',
            payload: {
                symbol: stockSymbol
            }
        });
    };

    

    return (
        <React.Fragment>
            <PurchaseModal 
                purchaseOpen={purchaseOpen}
                user={user}
                stockData={stockData}
                purchaseStock={purchaseStock}
                handlePurchaseModalClose={handlePurchaseModalClose}
                quantity={quantity}
                setQuantity={setQuantity}
            />
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    arie-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>
                        {stockSymbol}  &nbsp;
                        Current Price: ${round(stockData.c)} &nbsp;
                        Day Change: {round(stockData.dp)}%
                        {dbData &&
                            <div>
                                <p>
                                    Quantity Owned: {dbData.totalQuantity} &nbsp;
                                    Average Purchase Price: ${round(dbData.avgPrice)} &nbsp;
                                    Total Holdings: ${round(dbData.totalHoldings)}
                                </p>
                            </div>
                        }
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container className={gridClass.root} spacing={2}>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
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
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <HistoryGraph 
                                    stockSymbol={stockSymbol}
                                    stockHistory={stockHistory}
                                />
                            </Grid>
                        </Grid>
                        {displayType === "search" &&
                            <Grid item xs={6}>
                                <Grid container spacing={1}>
                                    <Button 
                                        variant="outlined" 
                                        color="default" 
                                        onClick={addToWatchlist}
                                    >
                                        Watch
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={handlePurchaseModalOpen}
                                    >
                                        Buy
                                    </Button>
                                </Grid>
                            </Grid>
                        }
                        {displayType === "watchlist" &&
                            <Grid item xs={6}>
                                <Grid container spacing={1}>
                                    <Button 
                                        variant="outlined" 
                                        color="default" 
                                        onClick={removeFromWatchlist}
                                    >
                                        Remove
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={handlePurchaseModalOpen}
                                    >
                                        Buy
                                    </Button>
                                </Grid>
                            </Grid>
                        }
                        {displayType === "portfolio" &&
                            <Grid item xs={6}>
                                <Grid container spacing={1}>
                                    <Button 
                                        variant="outlined" 
                                        color="default" 
                                        onClick={sellStock}
                                    >
                                        Sell
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        onClick={handlePurchaseModalOpen}
                                    >
                                        Buy More
                                    </Button>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </AccordionDetails>
            </Accordion>  
        </React.Fragment>
    )
}
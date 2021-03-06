import React from "react"
import { useState } from 'react';
import { List, ListItem, makeStyles, Grid, Button } from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { useDispatch, useSelector } from "react-redux";
import HistoryGraph from "../HistoryGraph/HistoryGraph";
import round from "../../round";
import PurchaseModal from "../TransactionModals/PurchaseModal";
import SellModal from "../TransactionModals/SellModal";
import { useEffect } from "react";
import './StockDisplay.css';
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import { useHistory } from "react-router";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import directory from '../../stockDirectory';

const gridStyle = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
      color: '#dae5e3',
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
    dbData,
    transactions,
}) {
    // const user = useSelector((store) => store.user);
    const gridClass = gridStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const [quantity, setQuantity] = useState(0);
    const user = useSelector(store => store.user);
    // const [totalCost, setTotalCost] = useState(0);
    let totalCost = 0;
    const [purchaseOpen, setPurchaseOpen] = useState(false);
    const [sellOpen, setSellOpen] = useState(false);

    const purchaseStock = () => {
        console.log('buying stock');
        totalCost = (quantity * stockData.c);
        if (totalCost > user.availableBalance) {
            console.log('Purchase exceeds available balance');
            alert('You do not have enough funds available to purchase that quantity. Please try again.');
        } else {
            dispatch({
                type: 'CREATE_STOCK',
                payload: {
                    symbol: stockSymbol,
                    price: stockData.c,
                    quantity,
                    isBoughtOrSold: true,
                },
            });
            dispatch({
                type: 'DECREASE_BALANCES',
                payload: {
                    totalCost,
                    availableBalance: user.availableBalance,
                    operator: 'decrease',
                }
            });
            handlePurchaseModalClose();
            history.push('/portfolio');
        }
    }

    const handlePurchaseModalOpen = () => {
        setPurchaseOpen(true);
    }

    const handlePurchaseModalClose = () => {
        setPurchaseOpen(false);
    }

    const sellStock = () => {
        console.log('selling stock');
        totalCost = (quantity * stockData.c);
        if (Number(quantity) > Number(dbData.totalQuantity)) {
            console.log('Attempting to sell too many stocks');
            alert('You cannot sell more stocks than you have. Please try again.');
        } else {
            dispatch({
                type: 'CREATE_STOCK',
                payload: {
                    symbol: stockSymbol,
                    price: stockData.c,
                    quantity: quantity,
                    isBoughtOrSold: false
                },
            });
            dispatch({
                type: 'INCREASE_BALANCES',
                payload: {
                    totalCost,
                    availableBalance: user.availableBalance,
                    operator: 'increase',
                }
            });
            handleSellModalClose();
        }
    }

    const handleSellModalOpen = () => {
        setSellOpen(true);
    }

    const handleSellModalClose = () => {
        setSellOpen(false);
    }

    const addToWatchlist = () => {
        console.log('Adding to watchlist');
        dispatch({
            type: 'CREATE_WATCHLISTED_STOCK',
            payload: {
                symbol: stockSymbol
            }
        });
    }

    const removeFromWatchlist = () => {
        console.log('removing from watchlist', stockSymbol);
        dispatch({
            type: 'DELETE_WATCHLISTED_STOCK',
            payload: {
                symbol: stockSymbol
            }
        });
    }

    const removeFromPortfolio = () => {
        console.log('removing stock from portfolio');
        dispatch({
            type: 'DELETE_PORTFOLIO_STOCK',
            payload: {
                symbol: stockSymbol
            }
        });
    }

    
    
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
            <SellModal
                sellOpen={sellOpen}
                user={user}
                stockData={stockData}
                sellStock={sellStock}
                handleSellModalClose={handleSellModalClose}
                quantity={quantity}
                setQuantity={setQuantity}
                dbData={dbData}
            />
            <Accordion elevation={3} className='accordian'>
                <AccordionSummary
                    className='accordian'
                    expandIcon={<ExpandMoreIcon />}
                    arie-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className={classes.heading}>
                        {stockSymbol}  &nbsp;&nbsp;&nbsp;
                        Current Price: ${round(stockData.c)} &nbsp;&nbsp;&nbsp;
                        Day Change: {stockData.dp >= 0 ? 
                            <><KeyboardArrowUpIcon style={{transform: 'translate(0%, 25%)'}}/> <span style={{color: 'green'}}>{round(stockData.dp)}%</span></> : 
                            <><KeyboardArrowDownIcon style={{transform: 'translate(0%, 25%)'}}/> <span style={{color: 'red'}}>{round(stockData.dp)}%</span></>
                            }
                        {(dbData && (dbData.totalQuantity > 0)) &&
                            <div>
                                <p>
                                    Quantity Owned: {dbData.totalQuantity} &nbsp;
                                    Average Purchase Price: ${round(dbData.avgPrice)} &nbsp;
                                    Total Holdings: ${round(dbData.totalQuantity * stockData.c)}
                                </p>
                            </div>
                        }
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container className={gridClass.root} spacing={2}>
                        {displayType === "portfolio" && 
                            <Grid item xs={12}>
                            <TransactionHistory 
                                transactions={transactions}
                                stockData={stockData}
                                stockSymbol={stockSymbol}
                                stockHistory={stockHistory}
                            />
                            </Grid>
                        }
                        {displayType !== 'portfolio' &&
                        <>
                        <Grid item xs={6}>
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
                        <Grid item xs={6}>
                                <HistoryGraph 
                                    stockSymbol={stockSymbol}
                                    stockHistory={stockHistory}
                                />
                        </Grid>
                        </>
                        }
                        {displayType === "search" &&
                            <Grid item xs={6}>
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
                        }
                        {displayType === "watchlist" &&
                            <Grid item xs={6}>
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
                        }
                        {displayType === "portfolio" &&
                            <Grid container >
                                <Grid item xs={4} align="center">
                                    <Button 
                                        variant="outlined" 
                                        color="default" 
                                        onClick={handleSellModalOpen}
                                    >
                                        Sell
                                    </Button>
                                </Grid>
                                <Grid item xs={4} align="center">
                                    {dbData.totalQuantity < 1 &&
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={removeFromPortfolio}
                                        >
                                            Remove
                                        </Button>
                                    }
                                </Grid>
                                <Grid item xs={4} align="center">
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
                    </Grid>
                </AccordionDetails>
            </Accordion>  
        </React.Fragment>
    )
}
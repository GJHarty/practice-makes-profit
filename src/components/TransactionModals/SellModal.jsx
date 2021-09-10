import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import round from '../../round';
import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, TextField, Typography } from '@material-ui/core';

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

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    }));
      
export default function SellModal({
    sellOpen, 
    user, 
    stockData, 
    sellStock, 
    handleSellModalClose, 
    quantity, 
    setQuantity,
    dbData,
}) {
    const classes = useStyles();
    const gridClass = gridStyle();

    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        setTotalCost(stockData.c * quantity);
    }, [quantity]);

  return (
    <div>
        <Modal
            aria-labelledby="sell-modal-title"
            aria-describedby="sell-modal-description"
            className={classes.modal}
            open={sellOpen}
            onClose={handleSellModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={sellOpen}>
                <div className={classes.paper}>
                    <h2 id="simple-modal-title">Sell</h2>
                    <div id="simple-modal-description">
                        <Grid container className={gridClass.root} spacing={2} style={{maxWidth: '550px'}}>
                            <Grid item xs={6}>
                                <Typography>Available Funds: ${round(user.availableBalance)}</Typography>
                                <Typography>Current/Market Stock Price: ${round(stockData.c)}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                {dbData &&
                                <Typography>Quantity Owned: {dbData.totalQuantity}</Typography>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <h3>Please select quantity:</h3>
                            </Grid>
                            
                            <Grid item xs={4}>
                                <p>Profit: ${round(totalCost)}</p>
                            </Grid>
                            <Grid item xs={4}>
                                <p>Updated Balance: ${round(user.availableBalance + totalCost)}</p>
                            </Grid>
                            {dbData && 
                                <Grid item xs={4}>
                                    {quantity <= Number(dbData.totalQuantity) ?
                                    <FormControl>
                                        <InputLabel>Quantity</InputLabel>
                                        <Input
                                            id="quantity-input"
                                            type="number"
                                            value={quantity}
                                            onChange={event => setQuantity(Number(event.target.value))} 
                                        />
                                    </FormControl>:
                                    <FormControl error>
                                        <InputLabel>Quantity</InputLabel>
                                        <Input
                                            id="quantity-input"
                                            type="number"
                                            value={quantity}
                                            onChange={event => setQuantity(Number(event.target.value))} 
                                        />
                                        <FormHelperText>Exceeded available quantity</FormHelperText>
                                    </FormControl>
                                    }
                                </Grid>
                            }
                            <Grid item xs={6} align="left">
                                <Button 
                                    variant="outlined" 
                                    color="default" 
                                    onClick={handleSellModalClose}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6} align="right">
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={sellStock}
                                >
                                    Confirm
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Fade>
        </Modal>
    </div>
  );
}


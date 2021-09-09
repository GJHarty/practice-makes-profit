import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import round from '../../round';
import { Button, Grid, TextField } from '@material-ui/core';

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
      
export default function PurchaseModal({
    purchaseOpen, 
    user, 
    stockData, 
    purchaseStock, 
    handlePurchaseModalClose, 
    quantity, 
    setQuantity
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
            aria-labelledby="purchase-modal-title"
            aria-describedby="purchase-modal-description"
            className={classes.modal}
            open={purchaseOpen}
            onClose={handlePurchaseModalClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={purchaseOpen}>
                <div className={classes.paper}>
                    <h2 id="simple-modal-title">Purchase</h2>
                    <div id="simple-modal-description">
                        <p>Available Funds: ${round(user.availableBalance)}</p>
                        <p>Current/Market Stock Price: ${round(stockData.c)}</p>
                        <h3>Please select quantity</h3>
                        <Grid container className={gridClass.root} spacing={2}>
                            <Grid item xs={4}>
                                <p>Total Cost: ${round(totalCost)}</p>
                            </Grid>
                            <Grid item xs={4}>
                                <p>Remaining Balance: ${round(user.availableBalance - totalCost)}</p>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField 
                                    label="Quantity" 
                                    value={quantity} 
                                    onChange={event => setQuantity(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <Button 
                        variant="outlined" 
                        color="default" 
                        onClick={handlePurchaseModalClose}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={purchaseStock}
                    >
                        Confirm
                    </Button>
                </div>
            </Fade>
        </Modal>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import round from '../../round';
import { Button, FormControl, Grid, Input, InputLabel, TextField, Typography } from '@material-ui/core';

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
                    <div id="simple-modal-description">
                        
                        <Grid 
                            container 
                            className={gridClass.root} 
                            spacing={2} 
                            justifyContent="center" 
                            style={{maxWidth: '550px'}}
                        >
                            <Grid item xs={12} align="center">
                                <h2 id="simple-modal-title">Purchase</h2>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Typography>Available Funds: ${round(user.availableBalance)}</Typography>
                                <Typography>Current/Market Stock Price: ${round(stockData.c)}</Typography>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <h3>Please select quantity:</h3>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>Total Cost: ${round(totalCost)}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>Updated Balance: ${round(user.availableBalance - totalCost)}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                {totalCost < user.availableBalance ?
                                <FormControl>
                                    <InputLabel>Quantity</InputLabel>
                                    <Input
                                        id="quantity-input"
                                        type="number"
                                        value={quantity}
                                        onChange={event => setQuantity(event.target.value)} 
                                    />
                                </FormControl> :
                                <FormControl error>
                                    <InputLabel>Quantity</InputLabel>
                                    <Input
                                        id="quantity-input"
                                        type="number"
                                        value={quantity}
                                        onChange={event => setQuantity(event.target.value)} 
                                    />
                                </FormControl>
                            }
                                
                            </Grid>
                            <Grid item xs={6} align="left">
                                <Button 
                                    variant="outlined" 
                                    color="default" 
                                    onClick={handlePurchaseModalClose}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6} align="right">
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={purchaseStock}
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


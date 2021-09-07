import React from "react"
import { Typography, List, ListItem, makeStyles, Grid } from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { useSelector } from "react-redux";
import HistoryGraph from "../HistoryGraph/HistoryGraph";

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

export default function StockDisplay({ stockSymbol, classes }) {
    const stock = useSelector(store => store.search);
    console.log(stock);
    const gridClass = useStyles();

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
                        Current Price: ${stock.c} 
                        Day Change: {stock.dp}%
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container className={gridClass.root} spacing={2}>
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <List component="nav" aria-label="expanded stock info">
                                    <ListItem>
                                        High Price of the Day: ${stock.h}
                                    </ListItem>
                                    <ListItem>
                                        Low Price of the Day: ${stock.l}
                                    </ListItem>
                                    <ListItem>
                                        Opening Price: ${stock.o}
                                    </ListItem>
                                    <ListItem>
                                        Previous Day Closing Price: ${stock.pc}
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
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </React.Fragment>
    )
}
import React from "react"
import { Typography, List, ListItem, makeStyles } from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function StockDisplay({ stockSymbol }) {
    const classes = useStyles();

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
                        Current Price: $  
                        Day Change: %
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List component="nav" aria-label="expanded stock info">
                        <ListItem>
                            High Price of the Day: $
                        </ListItem>
                        <ListItem>
                            High Price of the Day: $
                        </ListItem>
                        <ListItem>
                            High Price of the Day: $
                        </ListItem>
                        <ListItem>
                            High Price of the Day: $
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
        </React.Fragment>
    )
}
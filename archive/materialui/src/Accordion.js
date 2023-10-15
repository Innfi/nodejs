import React from 'react';
import { makeStyles, Accordion, AccordionSummary, 
    AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: { width: '100%'},
    heading: { 
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    }
}));

export default function SimpleAccordion() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} 
                    aria-controls="panel1a-content" id="panel1a-header">
                    <Typography className={classes.heading}>Accordition 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        accordition details
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
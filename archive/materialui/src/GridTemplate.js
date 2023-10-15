import React from 'react';
import MediaCard from './CardTemplate';
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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

  
export function GridTemplate() {
    const classes = useStyles();

    function Rows() {
        return (
            <React.Fragment>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={2}>
                            {[0, 1, 2].map((value) => (
                                <Grid key={value} item>
                                    <MediaCard />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }


    return (
        <Grid container spacing={1} direction="row" >
            <Grid container item xs={12} justify="center">
                <Rows />
            </Grid>
        </Grid>
    )
}
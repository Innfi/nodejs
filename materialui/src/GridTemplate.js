import React from 'react';
import MediaCard from './CardTemplate';
import { Grid } from '@material-ui/core'


export default function GridTemplate() {
    function Rows() {
        return (
            <React.Fragment>
                <MediaCard />
                <MediaCard />
                <MediaCard />
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
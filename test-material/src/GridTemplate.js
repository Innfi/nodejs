import React from 'react';
import MediaCard from './CardTemplate';
import { Grid } from '@material-ui/core'


export default function GridTemplate() {
    return (
        <Grid container spacing={1} direction="column">
            <Grid item xs={12} justify="center">
                <MediaCard />
                <MediaCard />
                <MediaCard />
            </Grid>
        </Grid>
    )
}
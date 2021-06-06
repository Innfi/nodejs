import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, 
    Button, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SimpleAccordion from './Accordion';

const useStyles = makeStyles({
    root: { maxWidth: 345 },
    media: {height: 140},
});

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root} >
            <CardActionArea>
                <CardMedia 
                    className={classes.media} 
                    image="https://www.fujifilm.co.th/globalassets/digital_cameras/x/fujifilm_x20/sample_images/img/index/ff_x20_008.jpg"
                    title="card image" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Flowers
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        description for flowers
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
            <CardActions>
                <SimpleAccordion />
            </CardActions>
        </Card>
    );
}
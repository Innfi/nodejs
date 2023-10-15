import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': { margin: theme.spacing(1), width: '25ch'}
    },
    gridroot: { flexGrow: 1 }
}));

export const FormPropsTextFields = () => {
    const classes = useStyles();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log('handleOnSubmit called');
    };

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" >
            <Grid container className={classes.gridroot} spacing={2}>
                <Grid item xs={4}>
                    <Button variant="contained" color="primary" className={classes.button}
                        onClick={(e) => handleOnSubmit(e)}>send</Button>
                </Grid>
                <Grid item xs={8}>
                    <div>
                        <TextField required 
                            id='standard-required' 
                            label="Label explain textfield" 
                            defaultValue="name" variant="outlined" />
                        <TextField disabled 
                            id="standard-disabled" 
                            label="Disabled" 
                            defaultValue="Hello World" />
                        <TextField
                            required 
                            id="outlined-disabled"
                            label="Filled textfield"
                            defaultValue="Hello World"
                            variant="filled" />
                    </div>
                
                </Grid>
            </Grid>
            </form>
        </div>
    );
};
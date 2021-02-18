import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


export default function SimpleSnackbar() {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if(reason === 'clickaway') return;

        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClick}>open simple snackbar</Button>
            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} 
                open={open} autoHideDuration={2000} 
                message="snackbar opened" 
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose} >
                        undo
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" 
                            onClick={handleClose}>                                
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                } />
        </div>
    )
}
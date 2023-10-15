import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';


//const useStyles = makeStyles((theme) => ({
//    todoGrid: {
//        paddingTop: theme.spacing(8),
//        paddingBottom: theme.spacing(8),
//    },
//    todoItem: {
//        height: '100%',
//        display: 'flex',
//        flexDirection: 'column'
//    },
//    todoItemText: {
//        flexGrow: 1,
//    },
//}));

let TodoItem = ({todo, index, removeTodo}) => {
    //const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <main>

            <Typography guttorBottom variant="h5" component="h2">
                {todo.text}
            </Typography>
            <Typography>
                Author: {todo.author}
            </Typography>
            <Button size="small" color="primary" onClick={() => removeTodo(index)}>
                Remove Todo
            </Button>

            </main>
        </React.Fragment>
    );
}

/*

        <div className='upper-class'>
            {todo.text}
            <div className='Author'>
                {todo.author}
            </div>
            <button onClick={ () => removeTodo(index) }>Remove Todo</button>
        </div>
*/

export default TodoItem;
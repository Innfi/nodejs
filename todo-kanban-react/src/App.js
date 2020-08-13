import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto', 
    width: 500,
    height: 400
  }
}));


let KanbanApp = () => {
  const classes = useTheme();
  const [todos, setTodos] = useState([
    {
      text: 'implement kanban',
      author: 'innfi',
      todoType:'Todo'
    },
    {
      text: 'apply materialUI',
      author: 'ennfi',
      todoType: 'On-Progress'
    },
    {
      text: 'write a terraform module',
      author: 'innfi',
      todoType: 'Done'
    }
  ]);

  const todoTypes = ['Todo', 'On-Progress', 'Done'];

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Kanban Todo
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <br />
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3} direction="row">
              {todoTypes.map((todoType) => (
                <KanbanUnit todos={todos} classes={classes} todoType={todoType} key={todoType} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </main>
    </React.Fragment>
  );
}

let KanbanUnit = ({todos, classes, todoType}) => {
  console.log('todoType: ', todoType);

  return (
      todos.filter(todo => todo.todoType === todoType).map((todo, index) => (
      <Grid key={todo} item sm={3}>
        <Paper elevation={3} variant="outlined" className={classes.paper}>
          <Typography variant="body1" color="primary">
            {todo.text}
          </Typography>
          <Typography variant="body1" >
            Author: {todo.author}
          </Typography>
        </Paper>
      </Grid>
      ))
  );
}

let KanbanForm = () => {
  
}

export default KanbanApp;

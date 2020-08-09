import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {todos.map((todo, index) => (
            <Grid item key={todo} xs={12} sm={6}>
              <Typography variant="h5" component="h2">
                {todo.text}
              </Typography>
              <Typography variant="h5" component="h2">
                Author: {todo.author}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}


export default KanbanApp;

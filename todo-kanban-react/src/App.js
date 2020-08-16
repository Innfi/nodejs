import React, { useState, memo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { CssBaseline, AppBar, Toolbar, Typography, 
  Button, Grid } from '@material-ui/core';



let KanbanApp = () => {
  const { todos, setTodos } = SetupProps();

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
      <br />
      <main>
        <Grid container justify="center">
          {todos.map((todo) => (
            <Button>
              {todo.text}
            </Button>
          ))}
        </Grid>
      </main>
    </React.Fragment>
  );
}

let SetupProps = () => {
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

  return {
    classes: classes,
    todos: todos,
    setTodos: setTodos,
    todoTypes: todoTypes
  }
}
export default KanbanApp;

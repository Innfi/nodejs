

class BackendHandler {
    constructor(url) {
        this.backendUrl = url;
    }
  
    loadTodos = (callback) => {
      const params = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
      };
  
      fetch(this.backendUrl, params)
      .then(response => response.json())
      .then(data => {
          callback(data);
      });
    }
  
    addTodo = (newTodo, callback) => {
        const params = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {todo: newTodo })
        };

        fetch(this.backendUrl, params)
            .then(response => response.json())
            .then(callback());
    }
  
    updateTodo = (todo, callback) => {
      const params = {
          method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {todo: todo })
        };
        
        fetch(this.backendUrl, params)
            .then(response => response.json())
            .then(callback());
    }

    removeTodo = (targetTodoId, callback) => {
        const params = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { todoId: targetTodoId } )
        };

        fetch(this.backendUrl, params)
            .then(response => response.json())
            .then(callback());
    }
  }
  
export default BackendHandler;
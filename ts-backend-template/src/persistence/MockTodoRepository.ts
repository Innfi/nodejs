import TodoRepository from './TodoRepository';
import { TodoStatus, Todo, TodoDict } from '../model/TodoEntity';


export class MockTodoRepository implements TodoRepository {
    protected todoDict: TodoDict = {};

    public async loadTodoList(id: string): Promise<Todo[]> {
        return new Promise((resolve, reject) => {
            const todos = this.todoDict[id];
            if(todos === undefined) reject('todolist not exist');

            resolve(todos);
        });
    }

    public async updateTodoList(id: string, todo: Todo): Promise<Todo> {
        return new Promise((resolve, reject) => {
            let todos: Todo[] = this.todoDict[id];
            if(todos === undefined) {
                todos = [];
                todos.push(todo);
            } else {
                const index = todos.findIndex(oldTodo => oldTodo.id === todo.id);
                todos.splice(index, 1);
                todos.push(todo);
            }

            this.todoDict[id] = todos;

            resolve(todo);
        });
    }
}
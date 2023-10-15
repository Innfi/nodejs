import { Todo } from '../model/TodoEntity';


interface TodoRepository {
    loadTodoList(id: string): Promise<Todo[]>;
    updateTodoList(id: string, todo: Todo): Promise<Todo>;
}

export default TodoRepository;
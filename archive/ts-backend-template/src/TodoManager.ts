import { Todo } from './model/TodoEntity';
import TodoRepository from './persistence/TodoRepository';


class TodoManager {
    protected todoRepo: TodoRepository;

    constructor(repo: TodoRepository) {
        this.todoRepo = repo;
    }

    async loadTodoList(id: string): Promise<Todo[]> {
        return await this.todoRepo.loadTodoList(id);
    }

    async updateTodoList(id: string, newTodo: Todo): Promise<Todo> {
        return await this.todoRepo.updateTodoList(id, newTodo);
    }
}

export default TodoManager;
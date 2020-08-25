import TodoRepository from './TodoRepository';
import { TodoStatus, Todo} from '../model/TodoEntity';


export class MockTodoRepository implements TodoRepository {
    public async loadTodoList(id: string): Promise<Todo[]> {
        return new Promise((resolve, reject) => {
            resolve(); //FIXME
        });
    }

    public async updateTodoList(id: string, todo: Todo): Promise<Todo> {
        return new Promise((resolve, reject) => {
            resolve(); //FIXME
        });
    }
}
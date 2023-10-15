import assert from 'assert';
import { MockTodoRepository } from '../src/persistence/MockTodoRepository';
import { Todo } from '../src/model/TodoEntity';


describe('TodoRepository', () => {
    const userId = 'innfi';
    let dummyTodo = new Todo('write a typescript template', 1);

    it('write / load todoList by userId', async () => {
        const todoRepo = new MockTodoRepository();
        await todoRepo.updateTodoList(userId, dummyTodo);

        const todoList = await todoRepo.loadTodoList(userId);
        assert.equal(todoList.length, 1);
        assert.equal(todoList[0].equals(dummyTodo), true);
    });

    it('update todo', async() => {
        const todoRepo = new MockTodoRepository();
        await todoRepo.updateTodoList(userId, dummyTodo);

        dummyTodo.text = 'update javascript templates';
        await todoRepo.updateTodoList(userId, dummyTodo);

        const todoList = await todoRepo.loadTodoList(userId);
        assert.equal(todoList.length, 1);
        assert.equal(todoList[0].equals(dummyTodo), true);
    });
});

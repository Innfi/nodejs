import express from 'express';
import TodoManager from '../TodoManager';
import { MockTodoRepository } from '../persistence/MockTodoRepository';


const todoRouter = express.Router();

todoRouter.get('/:userId', (req: express.Request, res: express.Response) => {
    const userId = req.params.userId;

    try {
        const manager = new TodoManager(new MockTodoRepository());
        manager.loadTodoList(userId)
        .then((todoList) => {
            res.send(todoList);
        });
    } catch(e) {
        console.log(e);
        res.status(400).send('error from GET');
    } finally {
        res.status(500).send('server unavailable');
    }
});

todoRouter.put('/:userId', (req: express.Request, res: express.Response) => {
    const userId = req.params.userId;
    const todo = req.body.todo;

    try {
        const manager = new TodoManager(new MockTodoRepository());
        manager.updateTodoList(userId, todo)
        .then((resultTodo) => {
            res.send(resultTodo);
        });
    } catch(e) {
        console.log(e);
        res.status(400).send('error from GET');
    } finally {
        res.status(500).send('server unavailable');
    }
});

export default todoRouter;

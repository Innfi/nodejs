export enum TodoStatus {
    Todo = 1,
    OnProgress = 3,
    Done = 7,
}

export class Todo {
    text: string = '';
    created: Date;
    todoStatus: TodoStatus;

    constructor(text: string) {
        this.text = text;
        this.created = new Date();
        this.todoStatus = TodoStatus.Todo;
    }
}

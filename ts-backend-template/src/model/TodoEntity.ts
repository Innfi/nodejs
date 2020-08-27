export enum TodoStatus {
    Todo = 1,
    OnProgress = 3,
    Done = 7,
}

export class Todo {
    id: number = 0;
    text: string = '';
    created: Date;
    todoStatus: TodoStatus;

    constructor(text: string, id: number) {
        this.id = id;
        this.text = text;
        this.created = new Date();
        this.todoStatus = TodoStatus.Todo;
    }

    equals(rhs: Todo) {
        if(this.id !== rhs.id) return false;
        if(this.text !== rhs.text) return false;
        if(this.todoStatus !== rhs.todoStatus) return false;

        return true;
    }
}

export interface TodoDict {
    userId?: string;
    todos?: Todo[];
}
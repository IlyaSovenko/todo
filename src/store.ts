import mobx, { observable, computed, action, IObservableArray } from 'mobx';

export interface ITodo {
    id: number;
    task: string;
    completed: boolean;
}

class Store {
    @observable todos: IObservableArray<ITodo> = observable([]);
    @observable pendingRequests: number = 0;

    constructor() {
        mobx.autorun(() => console.log(this.report));
    }

    @computed get completedTodosCount(): number {
        return this.todos.filter(
            (todo: ITodo) => todo.completed === true
        ).length;
    }

    @computed get report(): string {
        if (this.todos.filter((todo: ITodo) => todo.task !== '').length === 0) {
            return 'No todos, add something';
        }

        if (this.todos.filter((todo: ITodo) => todo.completed === false).length === 0) {
            return 'All todos done! Good job!';
        }

        return `Next todo: "${this.todos.filter((todo: ITodo) => todo.completed === false)[0].task}". ` +
            `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }

    @action addTodo(task: string): void {
        this.todos.push({
            id: Math.random(),
            task: task,
            completed: false,
        });
    }
    @action async asyncAddTodo(task: string) {
        this.pendingRequests++;
        setTimeout(
            () => {
                this.todos.push({
                    id: Math.random(),
                    task: task,
                    completed: false,
                });
                this.pendingRequests--; },
            1000
        );
    }
}

export default new Store();
export { Store };

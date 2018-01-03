import { inject } from 'mobx-react';
import * as React from 'react';
import { ITodoViewProps } from '../ItemList';
import './item.css';

@inject('store')
export class TodoView extends React.Component<ITodoViewProps> {
    render() {
        const todo = this.props.todo;
        return (
            <div onDoubleClick={this.onRename}>
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={todo.completed}
                />
                <span className="checkbox-custom" onClick={this.onToggleCompleted}/>
                <span className={todo.completed ? 'doneTask' : ''}>{todo.task}</span>
            </div>
        );
    }

    onToggleCompleted = (): void => {
        const todo = this.props.todo;
        todo.completed = !todo.completed;
    }

    onRename = (): void => {
        const todo = this.props.todo;
        if (todo.completed) { return; }
        const task = prompt('Task name', todo.task);
        if (task) {
            todo.task = task;
        } else {
            this.props.store!.todos.remove(todo);
        }
    }
}

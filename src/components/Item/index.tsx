import { inject } from 'mobx-react';
import * as React from 'react';
import { IStoreProps } from '../ItemList';
import './item.css';
import { ITodo } from '../../store';
import { ChangeEvent } from 'react';

interface ITodoViewProps extends IStoreProps {
    todo: ITodo;
}

@inject('store')
export class TodoView extends React.Component<ITodoViewProps, {changed: boolean, value: string}> {
    constructor(props: ITodoViewProps) {
        super(props);

        this.state = {
            changed: !props.todo.task,
            value: props.todo.task
        };
    }
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
                {this.state.changed ?
                    <input
                        className="input"
                        autoFocus={true}
                        value={this.state.value}
                        onChange={this.onHandleRename}
                        onBlur={this.onEndEditing}
                    />
                    : <span className={todo.completed ? 'doneTask' : ''}>{todo.task}</span>}
            </div>
        );
    }

    onToggleCompleted = () => { this.props.todo.completed = !this.props.todo.completed; };

    onHandleRename = (event: ChangeEvent<HTMLInputElement>) => { this.setState({value: event.target.value}); };

    onRename = () => { this.setState({changed: true}); };

    onEndEditing = () => {
        this.setState({changed: false});
        if (this.state.value) {
            this.props.todo.task = this.state.value;
        } else {
            this.props.store!.todos.remove(this.props.todo);
        }
    }
}

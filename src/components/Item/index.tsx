import { inject, observer } from 'mobx-react';
import { action, observable } from 'mobx';
import * as React from 'react';
import { IStoreProps } from '../ItemList';
import './item.css';
import { ITodo } from '../ItemList';
import { ChangeEvent } from 'react';

interface ITodoViewProps extends IStoreProps {
    todo: ITodo;
}

@inject('store')
@observer
export class TodoView extends React.Component<ITodoViewProps, {changed: boolean, value: string}> {
    @observable changed = !this.props.todo.task;
    @observable value = this.props.todo.task;
    // state = {
    //     changed: !this.props.todo.task,
    //     value: this.props.todo.task
    // };

    render() {
        const todo = this.props.todo;
        // const { changed, value } = this.state;
        return (
            <div onDoubleClick={this.onRename}>
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={todo.completed}
                />
                <span className="checkbox-custom" onClick={this.onToggleCompleted}/>
                {this.changed ?
                    <input
                        className="input"
                        autoFocus={true}
                        value={this.value}
                        onChange={this.onHandleRename}
                        onBlur={this.onEndEditing}
                    />
                    : <span className={todo.completed ? 'doneTask' : ''}>{todo.task}</span>}
            </div>
        );
    }

    onToggleCompleted = () => { this.props.todo.completed = !this.props.todo.completed; };

    @action onHandleRename = (event: ChangeEvent<HTMLInputElement>) => { this.value = event.target.value; };
    // onHandleRename = (event: ChangeEvent<HTMLInputElement>) => { this.setState({value: event.target.value}); };

    @action onRename = () => { this.changed = true; };
    // onRename = () => { this.setState({changed: true}); };

    @action onEndEditing = () => {
        this.changed = false;
        if (this.value) {
            this.props.todo.task = this.value;
        } else {
            this.props.store!.todos.remove(this.props.todo);
        }
    }
    // onEndEditing = () => {
    //     this.setState({changed: false});
    //     if (this.state.value) {
    //         this.props.todo.task = this.state.value;
    //     } else {
    //         this.props.store!.todos.remove(this.props.todo);
    //     }
    // }
}

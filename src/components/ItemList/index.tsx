import { inject, observer } from 'mobx-react';
import { TodoView } from '../Item';
import { action } from 'mobx';
import { Store, ITodo } from '../../store';
import * as React from 'react';
import './itemList.css';

interface IStoreProps {
    store?: Store;
}

export interface ITodoViewProps extends IStoreProps {
    todo: ITodo;
}

@inject('store')
@observer
export class TodoList extends React.Component <IStoreProps> {
    render() {
        const store = this.props.store!;
        return (
            <div className="todo-container">
                {store.report}
                <ul>
                    {store.todos && store.todos.map(
                        (todo: ITodo, idx: number) => (
                            <li>
                                <TodoView todo={todo} key={todo.id} />
                            </li>
                        ))}
                </ul>
                {store.pendingRequests > 0 ? <div>Loading...</div> : null}
                <button className="btn" onClick={this.onNewTodo}>New Todo</button>
                <button className="btn" onClick={this.onAsyncNewTodo}>Async New Todo</button>
                <br/>
                <small> (double-click a not done todo to edit)</small>
            </div>
        );
    }
    @action onNewTodo = (): void => {
        this.props.store!.addTodo(prompt('Enter a new todo:', 'coffee plz'));
    }
    @action onAsyncNewTodo = (): void => {
        this.props.store!.asyncAddTodo(prompt('Enter a new todo:', 'coffee plz'))
            .catch((e: {}) => console.log(e));
    }
}

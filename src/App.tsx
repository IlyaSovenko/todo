import * as React from 'react';
import './App.css';
import { inject, observer } from 'mobx-react';
import { action } from 'mobx';
import { Store, ITodo } from './store';
import DevTools from 'mobx-react-devtools';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>ToDo</h1>
        <TodoList />
        <DevTools position={{ top: 10, left: 100 }} />
      </div>
    );
  }
}

interface IStoreProps {
    store?: Store;
}

interface ITodoViewProps extends IStoreProps {
    todo: ITodo;
}

@inject('store')
@observer
class TodoList extends React.Component <IStoreProps> {
    render() {
        const store = this.props.store!;
        return (
            <div className="todo-container">
                {store.report}
              <ul>
                  {store.todos && store.todos.map(
                      (todo: ITodo, idx: number) => <TodoView todo={todo} key={todo.id} />
                  )}
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
            .catch(e => console.log(e));
    }
}

@inject('store')
class TodoView extends React.Component<ITodoViewProps> {
    render() {
        const todo = this.props.todo;
        return (
            <li onDoubleClick={this.onRename}>
                <input
                    className="checkbox"
                    type="checkbox"
                    checked={todo.completed}
                />
                <span className="checkbox-custom" onClick={this.onToggleCompleted}/>
                <span className={todo.completed ? 'doneTask' : ''}>{todo.task}</span>
            </li>
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

export default App;

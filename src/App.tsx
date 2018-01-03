import * as React from 'react';
import './App.css';
import DevTools from 'mobx-react-devtools';
import { TodoList } from './components/ItemList/index';

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

export default App;

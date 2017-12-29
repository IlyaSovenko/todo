import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import store from './store';
import { Provider } from 'mobx-react';

export const rootStore = { store };

ReactDOM.render(
    <Provider {...rootStore}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);

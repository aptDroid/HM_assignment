import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers/reducers';
import {Routes} from './components/Routes';
// import App from './components/App';

let store = createStore(reducer);

const renderApp = () => {
	ReactDOM.render(
	<Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('app')
	);
};

store.subscribe(renderApp);
renderApp();

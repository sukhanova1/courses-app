import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import user from './users/reducers';
import courses from './courses/reducers';
import authors from './authors/reducers';

const reducers = combineReducers({
	user,
	courses,
	authors,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducers,
	composeEnhancer(applyMiddleware(thunk))
	// applyMiddleware(thunk),
	// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

/**
 * @author {[Monty Khanna]}
 */
import { combineReducers } from 'redux-immutable';
import { createBrowserHistory, createHashHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';
import { fromJS } from 'immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable';
import moduleReducers from './reducers';
import ApiClient from './ApiClient';
import clientMiddleware from './clientMiddleware';

const api = new ApiClient();

export const history = window.matchMedia('(display-mode: standalone)').matches
    ? createHashHistory()
    : createBrowserHistory();

export default function configureStore(preLoadedState) {
    const middleware = [
        thunkMiddleware.withExtraArgument(api),
        clientMiddleware(api),
        routerMiddleware(history)
    ];

    if (process.env.NODE_ENV !== 'production') {
        if (!window.devToolsExtension) {
            middleware.push(logger);
        }
    }

    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const rootReducer = (history) => combineReducers({
        router: connectRouter(history),
        form: formReducer,
        ...moduleReducers
    });
    const initialState = fromJS(preLoadedState || {});

    return createStore(
        rootReducer(history),
        initialState,
        composeEnhancer(
            applyMiddleware(...middleware),
        ),
    );
}
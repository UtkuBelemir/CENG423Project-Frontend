import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import {notificationReducers, userReducer, dataReducers} from './reducers';
import {reducer as formReducer} from 'redux-form';

const allReducers = combineReducers({
    notificationOps: notificationReducers,
    userOps: userReducer,
    dataOps: dataReducers,
    form: formReducer,
})
const composeEnhancers =
    typeof window === 'object' &&
    process.env.NODE_ENV !== 'production' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;
const enhancer = composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
);
const store = createStore(allReducers, enhancer)
export default store;
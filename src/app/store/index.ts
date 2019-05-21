import { createStore, combineReducers } from 'redux';

import { reducers } from './reducers';

const rootReducer = combineReducers({
    heros: reducers.heroes
});

export const store = createStore(rootReducer);

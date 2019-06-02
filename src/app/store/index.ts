import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import { Injectable, OnInit } from 'angular-ts-decorators';
// import * as fromStore from '../store';

@Injectable('HeroesStore')
export class HeroesStore implements OnInit {
    constructor() {}
    ngOnInit() {
        const reducer = combineReducers(reducers);
        return createStore(reducer, applyMiddleware(thunk));
    }
}

export * from './reducers';
export * from './actions';
export * from './effects';
export * from './selectors';

/*
const reducer = combineReducers(reducers);

export const store = createStore(reducer, applyMiddleware(thunk));

export * from './reducers';
export * from './actions';
export * from './effects';
export * from './selectors';

*/

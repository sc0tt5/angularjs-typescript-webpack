// import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromHeroes from './heroes.reducer';

// products interface from pizza state
export interface HeroesState {
    heroes: fromHeroes.HeroState;
}

// register reducers
// ActionReducerMap<ProductsState> type checks
export const reducers = {
    heroes: fromHeroes.reducer
};

export const getHeroesState = state => state.heroes;

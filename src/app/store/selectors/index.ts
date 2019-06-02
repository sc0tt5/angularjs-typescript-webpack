import { HeroesSelectors } from './heroes.selectors';

// export property as effects
export const selectors: any[] = [HeroesSelectors];

export * from './heroes.selectors';

// ------
// export * from './heroes.selectors';

// import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

/* import * as fromHeroes from './heroes.selectors';

// register reducers
// ActionReducerMap<ProductsState> type checks
export const select = {
    heroes: fromHeroes.select
}; */

// export const select = selector => selector;

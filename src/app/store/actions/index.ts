// export * from './heroes.action';

import * as fromHeroes from './heroes.action';

// products interface from pizza state
export interface HeroesActions {
    heroes: fromHeroes.HeroesAction;
}

// register reducers
// ActionReducerMap<ProductsState> type checks
export const actions = {
    heroes: fromHeroes
};

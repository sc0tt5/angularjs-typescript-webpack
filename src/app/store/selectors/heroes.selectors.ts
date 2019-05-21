/* import { createSelector } from 'reselect';

import * as fromRoot from '../../../app/store';
// import * as fromFeature from '../reducers';
import * as fromHeroes from '../reducers/heroes.reducer';

import { Hero } from './../../core/model/hero';

// heroes state */
/* export const getHeroState = createSelector(
    fromHeroes.getHeroesEntities,
    (state: fromHeroes. ..HeroesState) => state.heroes
);

export const getHeroesEntities = createSelector(
    getHeroState,
    fromHeroes.getHeroesEntities
);

export const getSelectedHero = createSelector(
    getHeroesEntities, // using feature state
    fromRoot.getRouterState, // using root state
    (entities, router): Hero => {
        // then composing new state to be returned to the application
        return router.state && entities[router.state.params.heroId];
    }
);

export const getAllHeroes = createSelector(
    getHeroesEntities,
    entities => {
        return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
    }
);

export const getHeroesLoaded = createSelector(
    getHeroState,
    fromHeroes.getHeroesLoaded
);

export const getHeroesLoading = createSelector(
    getHeroState,
    fromHeroes.getHeroesLoading
);
 */

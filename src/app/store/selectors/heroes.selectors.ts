import { createSelector } from 'reselect';
import * as fromFeature from '../reducers';
import * as fromHeroes from '../reducers/heroes.reducer';

export class HeroesSelectors {
    constructor() {}

    getHeroState = createSelector(
        fromFeature.getHeroesState,
        (state: fromFeature.HeroesState) => state.heroes
    );

    // heroes state */
    /*export const getHeroState = createSelector(
    fromHeroes.getHeroesEntities,
    (state: fromHeroes. ..HeroesState) => state.heroes
);*/

    getHeroesEntities = createSelector(
        this.getHeroState,
        fromHeroes.getHeroesEntities
    );

    /*
getSelectedHero = createSelector(
    getHeroesEntities, // using feature state
    fromRoot.getRouterState, // using root state
    (entities, router): Hero => {
        // then composing new state to be returned to the application
        return router.state && entities[router.state.params.heroId];
    }
);
*/

    getAllHeroes = createSelector(
        this.getHeroesEntities,
        entities => {
            return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
        }
    );

    getHeroesLoaded = createSelector(
        this.getHeroState,
        fromHeroes.getHeroesLoaded
    );

    getHeroesLoading = createSelector(
        this.getHeroState,
        fromHeroes.getHeroesLoading
    );

    /* export function select(selector) {
    return selector;
} */
}

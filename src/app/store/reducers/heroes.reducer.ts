import { HeroState } from './heroes.reducer';
import * as fromHeroes from '../actions/heroes.action';
import { Hero } from './../../core/model/hero';

export interface HeroState {
    entities: { [id: number]: Hero };
    loaded: boolean;
    loading: boolean;
}

export const initialState: HeroState = {
    entities: {},
    loaded: false,
    loading: false
};

export function reducer(
    state = initialState,
    action: fromHeroes.HeroesAction
): HeroState {
    switch (action.type) {
        case fromHeroes.LOAD_HEROES: {
            return {
                ...state,
                loading: true
            };
        }

        case fromHeroes.LOAD_HEROES_SUCCESS: {
            const heroes = action.payload;

            const entities = heroes.reduce(
                // tslint:disable-next-line: no-shadowed-variable
                (entities: { [id: number]: Hero }, hero: Hero) => {
                    return {
                        ...entities,
                        [hero.id]: hero
                    };
                },
                {
                    ...state.entities
                }
            );

            return {
                ...state,
                loading: false,
                loaded: true,
                entities
            };
        }

        case fromHeroes.LOAD_HEROES_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        // if update or create (first case will fall through)
        case fromHeroes.UPDATE_HERO_SUCCESS:
        case fromHeroes.CREATE_HERO_SUCCESS: {
            const hero = action.payload;
            const entities = {
                ...state.entities,
                [hero.id]: hero
            };

            return {
                ...state,
                entities
            };
        }

        case fromHeroes.REMOVE_HERO_SUCCESS: {
            const hero = action.payload;

            const { [hero.id]: removed, ...entities } = state.entities;

            return {
                ...state,
                entities
            };
        }
    }

    return state;
}

// selectors
export const getHeroesEntities = (state: HeroState) => state.entities;
export const getHeroesLoading = (state: HeroState) => state.loading;
export const getHeroesLoaded = (state: HeroState) => state.loaded;

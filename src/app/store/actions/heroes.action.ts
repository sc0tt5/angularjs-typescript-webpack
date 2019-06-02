import { Action } from 'redux';
import { Hero } from './../../core/model/hero';

// load heroes
export const LOAD_HEROES = '[Heroes] Load Heroes';
export const LOAD_HEROES_FAIL = '[Heroes] Load Heroes Fail';
export const LOAD_HEROES_SUCCESS = '[Heroes] Load Heroes Success';

// action creators
// implements Action for type checking purposes (see import Action above)
export class LoadHeroes implements Action {
    readonly type = LOAD_HEROES;
}

export class LoadHeroesFail implements Action {
    readonly type = LOAD_HEROES_FAIL;
    constructor(public payload: any) {}
}

export class LoadHeroesSuccess implements Action {
    readonly type = LOAD_HEROES_SUCCESS;
    constructor(public payload: Hero[]) {}
}

// create hero
/* export const CREATE_HERO = '[Heroes] Create Hero';
export const CREATE_HERO_FAIL = '[Heroes] Create Hero Fail';
export const CREATE_HERO_SUCCESS = '[Heroes] Create Hero Success';

export class CreateHero implements Action {
    readonly type = CREATE_HERO;
    constructor(public payload: Hero) {}
}

export class CreateHeroFail implements Action {
    readonly type = CREATE_HERO_FAIL;
    constructor(public payload: any) {}
}

export class CreateHeroSuccess implements Action {
    readonly type = CREATE_HERO_SUCCESS;
    constructor(public payload: Hero) {}
}

// update Hero
export const UPDATE_HERO = '[Heroes] Update Hero';
export const UPDATE_HERO_FAIL = '[Heroes] Update Hero Fail';
export const UPDATE_HERO_SUCCESS = '[Heroes] Update Hero Success';

export class UpdateHero implements Action {
    readonly type = UPDATE_HERO;
    constructor(public payload: Hero) {}
}

export class UpdateHeroFail implements Action {
    readonly type = UPDATE_HERO_FAIL;
    constructor(public payload: any) {}
}
export class UpdateHeroSuccess implements Action {
    readonly type = UPDATE_HERO_SUCCESS;
    constructor(public payload: Hero) {}
}

// remove hero
export const REMOVE_HERO = '[Heroes] Remove Hero';
export const REMOVE_HERO_FAIL = '[Heroes] Remove Hero Fail';
export const REMOVE_HERO_SUCCESS = '[Heroes] Remove Hero Success';

export class RemoveHero implements Action {
    readonly type = REMOVE_HERO;
    constructor(public payload: Hero) {}
}

export class RemoveHeroFail implements Action {
    readonly type = REMOVE_HERO_FAIL;
    constructor(public payload: any) {}
}
export class RemoveHeroSuccess implements Action {
    readonly type = REMOVE_HERO_SUCCESS;
    constructor(public payload: Hero) {}
} */

// export action types
export type HeroesAction = LoadHeroes | LoadHeroesFail | LoadHeroesSuccess;
/* | CreateHero
    | CreateHeroFail
    | CreateHeroSuccess
    | UpdateHero
    | UpdateHeroFail
    | UpdateHeroSuccess
    | RemoveHero
    | RemoveHeroFail
    | RemoveHeroSuccess; */

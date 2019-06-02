// https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux
// https://github.com/reduxjs/redux-thunk/issues/213

// import { ThunkAction, ThunkDispatch } from 'redux-thunk';
// import { Action, Dispatch } from 'redux';
import { AnyAction } from 'redux';

// import { Injectable } from 'angular-ts-decorators';
// import { Observable, of } from 'rxjs';

// import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';

// import * as fromRoot from '../../../app/store';
import * as heroAction from '../../store/actions/heroes.action';
import * as fromServices from '../../store/services/hero.service';
import { of } from 'rxjs/internal/observable/of';

// import { ThunkAction } from 'redux-thunk';

export class HeroesEffects {
    constructor(
        private actions$: AnyAction,
        private heroService: fromServices.HeroService
    ) {}

    // @Effect()
    loadHeroes$ = this.actions$.pipe(heroAction.LOAD_HEROES).pipe(
        switchMap(() => {
            return this.heroService.getHeroes().pipe(
                map(heroes => new heroAction.LoadHeroesSuccess(heroes)),
                catchError(error => of(new heroAction.LoadHeroesFail(error)))
            );
        })
    );

    // @Effect()
    /* createHero$ = this.actions$.pipe(heroAction.CREATE_HERO).pipe(
        map((action: heroAction.CreateHero) => action.payload),
        switchMap(hero =>
            this.heroService
                .addHero(hero)
                .pipe(
                    map(
                        hero => new heroAction.CreateHeroSuccess(hero),
                        catchError(error => of(new heroAction.CreateHeroFail(error)))
                    )
                )
        )
    );

    // this effect will enable us to auto redirect to the newly created hero
    // @Effect()
    createHeroSuccess$ = this.actions$.pipe(heroAction.CREATE_HERO_SUCCESS).pipe(
        map((action: heroAction.CreateHeroSuccess) => action.payload),
        map(
            hero =>
                new fromRoot.Go({
                    path: ['/hero', hero.id]
                })
        )
    );

    // @Effect()
    updateHero$ = this.actions$.pipe(ofType(heroAction.UPDATE_HERO)).pipe(
        map((action: heroAction.UpdateHero) => action.payload),
        switchMap(hero =>
            this.heroService
                .updateHero(hero)
                .pipe(
                    map(
                        hero => new heroAction.UpdateHeroSuccess(hero),
                        catchError(error => of(new heroAction.UpdateHeroFail(error)))
                    )
                )
        )
    );

    // @Effect()
    removeHero$ = this.actions$.pipe(ofType(heroAction.REMOVE_HERO)).pipe(
        map((action: heroAction.RemoveHero) => action.payload),
        switchMap(hero =>
            this.heroService
                .removeHero(hero)
                .pipe(
                    map(
                        () => new heroAction.RemoveHeroSuccess(hero),
                        catchError(error => of(new heroAction.RemoveHeroFail(error)))
                    )
                )
        )
    );

    // this effect will enable us to auto redirect when delete or update
    // @Effect()
    handleHeroSuccess$ = this.actions$
        .pipe(ofType(heroAction.UPDATE_HERO_SUCCESS, heroAction.REMOVE_HERO_SUCCESS))
        .pipe(
            map(
                hero =>
                    new fromRoot.Go({
                        path: ['/hero']
                    })
            )
        ); */
}

/*
type MyRootState = {};
type MyExtraArg = undefined;
type MyThunkResult<R> = ThunkAction<R, MyRootState, MyExtraArg, Action>;
// Next Line:
// It is important to use Action as last type argument, does not work with any.
type MyThunkDispatch = ThunkDispatch<MyRootState, MyExtraArg, Action>;

const anotherThunkAction = (): MyThunkResult<Promise<boolean>> => (
    dispatch,
    getState
) => {
    return Promise.resolve(true);
};

export interface IProps {
    anotherThunkAction: () => Promise<boolean>;
}

export class Foo extends React.Component<IProps> {
    componentDidMount() {
        this.props.anotherThunkAction().then(value => {
            console.log('hello world, got', value);
        });
    }
    render() {
        return null;
    }
}

const mapDispatchToProps = (dispatch: MyThunkDispatch) => ({
    anotherThunkAction: () => dispatch(anotherThunkAction())
});

export default connect(
    () => undefined,
    mapDispatchToProps
)(Foo);
 */

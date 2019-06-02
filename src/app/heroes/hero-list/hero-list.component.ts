import { Component, OnInit } from 'angular-ts-decorators';
// import { Store } from 'redux';
import { HeroService } from '../../store/services/hero.service';
// import { Observable } from 'rxjs/internal/Observable';
// import { from } from 'rxjs/internal/observable/from';
import { Hero } from '../../core/model/hero';
// import * as fromStore from '../../store';

@Component({
    selector: 'app-hero-list',
    template: require('./hero-list.component.html'),
    styles: [require('./hero-list.component.scss')]
})
export class HeroListComponent implements OnInit {
    heroes: Hero[] = [];
    // heroes$: Observable<Hero>;

    /*@ngInject*/
    constructor(private heroService: HeroService) {}
    // private store: Store<fromStore.HeroesState>, private selectors: fromStore.HeroesSelectors

    ngOnInit() {
        this.getHeroes();
        // this.heroes$ = from(this.selectors.getAllHeroes(this.store.getState()));
        // console.log(this.heroes$);
    }

    getHeroes(): void {
        this.heroService.getHeroes(); //.then(heroes => (this.heroes = heroes.slice(1, 5)));
    }
}

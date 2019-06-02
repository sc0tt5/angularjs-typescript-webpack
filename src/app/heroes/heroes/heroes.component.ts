import { Component, OnInit } from 'angular-ts-decorators';
import { Store } from 'redux';
// import { from } from 'rxjs/internal/observable/from';
import { Hero } from '../../core/model/hero';
import * as fromStore from '../../store';
import { HeroService } from '../../store/services/hero.service';

@Component({
    selector: 'app-heroes',
    template: require('./heroes.component.html'),
    styles: [require('./heroes.component.scss')]
})
export class HeroesComponent implements OnInit {
    heroes: Hero[];
    store: Store<fromStore.HeroesState>;
    selectors: fromStore.HeroesSelectors;

    /*@ngInject*/
    constructor(private heroService: HeroService) {}

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => (this.heroes = heroes));
        // from(this.selectors.getAllHeroes(this.store.getState()));
    }

    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.addHero(name).then(() => this.getHeroes());
    }

    delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero).then();
    }
}

import { Component } from 'angular-ts-decorators';
import { Hero } from '../../core/model/hero';
import { HeroService } from '../../store/services/hero.service';

@Component({
    selector: 'app-hero-search',
    template: require('./hero-search.component.html'),
    styles: [require('./hero-search.component.scss')]
})
export class HeroSearchComponent {
    heroes: Hero[];

    /*@ngInject*/
    constructor(private heroService: HeroService) {}

    // Push a search term into the observable stream.
    search(term: string): void {
        this.heroService.searchHeroes(term).then(heroes => (this.heroes = heroes));
    }
}

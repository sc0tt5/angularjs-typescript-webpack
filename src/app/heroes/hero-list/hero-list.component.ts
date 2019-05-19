import { Component, OnInit } from 'angular-ts-decorators';
import { Hero } from '../../core/model/hero';
import { HeroService } from '../../store/services/hero.service';

@Component({
    selector: 'app-hero-list',
    template: require('./hero-list.component.html'),
    styles: [require('./hero-list.component.scss')]
})
export class HeroListComponent implements OnInit {
    heroes: Hero[] = [];

    /*@ngInject*/
    constructor(private heroService: HeroService) {}

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => (this.heroes = heroes.slice(1, 5)));
    }
}

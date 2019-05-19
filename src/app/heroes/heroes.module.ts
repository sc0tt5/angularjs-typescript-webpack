import { NgModule } from 'angular-ts-decorators';
import { HeroService } from './../hero.service';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
    id: 'HeroesModule',
    imports: [],
    declarations: [
        HeroListComponent,
        HeroesComponent,
        HeroDetailComponent,
        HeroSearchComponent
    ],
    providers: [HeroService]
})
export class HeroesModule {}

import { NgModule } from 'angular-ts-decorators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeroesModule } from './heroes/heroes.module';
import './../styles/styles';

@NgModule({
    id: 'AppModule',
    imports: [AppRoutingModule, CoreModule, HeroesModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}

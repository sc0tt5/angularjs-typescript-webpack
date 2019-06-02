import { IHttpService, IPromise, IQService } from 'angular';
import { Injectable } from 'angular-ts-decorators';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { throwError } from 'rxjs/internal/observable/throwError';
// import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Hero } from '../../core/model/hero';
import { MessageService } from './message.service';

@Injectable('heroService')
export class HeroService {
    private heroes: Hero[] = [];
    private heroesUrl = 'heroes.json'; // URL to web api

    /*@ngInject*/
    constructor(
        private $http: IHttpService,
        private $q: IQService,
        private messageService: MessageService
    ) {}

    // GET heroes from the server
    /* getHeroes(): Observable<Hero[]> {
    return from(this.$http.get<Hero[]>(this.heroesUrl))
      .pipe(map(heroes => heroes.data))
      .pipe(catchError((error: any) => throwError(error.json())));
  } */
    getHeroes(): IPromise<Hero[]> {
        const deferred = this.$q.defer<Hero[]>();
        if (this.heroes.length) {
            deferred.resolve(this.heroes);
        } else {
            this.$http.get<Hero[]>(this.heroesUrl).then(
                response => {
                    this.log('fetched heroes');
                    this.heroes = response.data;
                    deferred.resolve(response.data);
                },
                error => {
                    this.log(error);
                    deferred.reject(error);
                }
            );
        }
        return deferred.promise;
    }

    // GET hero by id
    getHero(id: number): IPromise<Hero> {
        const deferred = this.$q.defer<Hero>();
        const hero = this.heroes.find(h => h.id === id);
        if (hero) {
            this.log(`fetched hero ${id}`);
            deferred.resolve(hero);
        } else {
            const error = `hero with id=${id} not found`;
            this.log(error);
            deferred.reject(error);
        }
        return deferred.promise;
    }

    //  GET heroes whose name contains search term
    searchHeroes(term: string): IPromise<Hero[]> {
        const deferred = this.$q.defer<Hero[]>();
        const error = `no heroes with name that contains ${term}`;
        if (!term.trim()) {
            // if not search term, return empty hero array.
            this.log(error);
            deferred.resolve([]);
        }
        const heroes = this.heroes.filter(hero => hero.name.includes(term));
        this.log(`found ${heroes.length} heroes whose name contains ${term}`);
        deferred.resolve(heroes);
        return deferred.promise;
    }

    // POST: add a new hero to the server
    addHero(name: string): IPromise<Hero> {
        const deferred = this.$q.defer<Hero>();
        const hero = { name, id: this.getNewId() };
        this.heroes.push(hero);
        this.log('added new hero');
        deferred.resolve(hero);
        return deferred.promise;
    }

    // DELETE: delete the hero from the server
    deleteHero(hero: Hero | number): IPromise<boolean> {
        const deferred = this.$q.defer<boolean>();
        const id = typeof hero === 'number' ? hero : hero.id;
        const index = this.heroes.findIndex(h => h.id === id);
        if (index > -1) {
            this.heroes.splice(index, 1);
            this.log(`deleted hero with id=${id}`);
            deferred.resolve(true);
        } else {
            const error = `failed to delete hero with id=${id}, not found`;
            this.log(error);
            deferred.reject(error);
        }
        return deferred.promise;
    }

    // PUT: update the hero on the server
    updateHero(hero: Hero): IPromise<any> {
        const deferred = this.$q.defer<Hero>();
        const index = this.heroes.findIndex(h => h.id === hero.id);
        if (index > -1) {
            this.heroes[index] = hero;
            this.log(`updated hero with id=${hero.id}`);
            deferred.resolve(hero);
        } else {
            const error = `failed to update hero with id=${hero.id}, not found`;
            this.log(error);
            deferred.reject(error);
        }
        return deferred.promise;
    }

    // Log a HeroService message with the MessageService
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    private getNewId() {
        if (!this.heroes.length) {
            return 1;
        }
        return Math.max(...this.heroes.map(h => h.id)) + 1;
    }
}

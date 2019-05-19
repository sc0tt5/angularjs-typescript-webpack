import { Component } from 'angular-ts-decorators';
import { ComponentFixture, TestBed } from 'angularjs-testbed';
import { HEROES } from '../../mock-heroes';
import { HeroListComponent } from './hero-list.component';

@Component({ selector: 'app-hero-search', template: '' })
export class HeroSearchComponent {}

describe('HeroListComponent', () => {
    let component: HeroListComponent;
    let fixture: ComponentFixture<HeroListComponent>;
    let heroService;
    let getHeroesSpy;

    beforeEach(() => {
        heroService = jasmine.createSpyObj('heroService', ['getHeroes']);
        getHeroesSpy = heroService.getHeroes.and.returnValue(Promise.resolve(HEROES));
        TestBed.configureTestingModule({
            declarations: [HeroListComponent, HeroSearchComponent],
            providers: [{ provide: 'heroService', useValue: heroService }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display "Top Heroes" as headline', () => {
        expect(fixture.nativeElement.querySelector('h3').textContent).toEqual(
            'Top Heroes'
        );
    });

    it('should call heroService', () => {
        expect(getHeroesSpy.calls.any()).toBe(true);
    });

    it('should display 4 links', () => {
        setTimeout(() => {
            fixture.detectChanges();
            expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
        }, 100);
    });
});

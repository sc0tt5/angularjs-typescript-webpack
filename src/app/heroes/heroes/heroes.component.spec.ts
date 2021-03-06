import { ComponentFixture, TestBed } from 'angularjs-testbed';
import { HEROES } from '../../../assets/mock-heroes';
import { HeroesComponent } from './heroes.component';

describe('HeroesComponent', () => {
    let component: HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;
    let heroService;
    // @ts-ignore
    let getHeroesSpy;

    beforeEach(() => {
        heroService = jasmine.createSpyObj('heroService', ['getHeroes']);
        getHeroesSpy = heroService.getHeroes.and.returnValue(Promise.resolve(HEROES));
        TestBed.configureTestingModule({
            declarations: [HeroesComponent],
            providers: [{ provide: 'heroService', useValue: heroService }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});

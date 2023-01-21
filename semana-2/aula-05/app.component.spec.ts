import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'test-class'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('test');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const webComponent = fixture.nativeElement as HTMLElement;
    expect(webComponent.querySelector('h1')?.textContent).toContain('test app is running!');
  });

  it('should test function is true', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.test()).toBeTrue();
  })

  it('should test matches', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.people = [
      { nome: 'Mardoqueu', idade: 20 },
      { nome: 'Lisa', idade: 17 },
      { nome: 'Luan', idade: 37 },
    ];

    fixture.detectChanges();

    const listNames = fixture.debugElement.queryAll(By.css('#people-list li'));

    expect(listNames[0].nativeElement.textContent.trim()).toEqual('Mardoqueu');
    expect(listNames[1].nativeElement.textContent.trim()).toEqual('Lisa');
    expect(listNames[2].nativeElement.textContent.trim()).toEqual('Luan');
  })

  it('should emit person name on click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.people = [
      { nome: 'Mardoqueu' },
      { nome: 'Lisa' },
      { nome: 'Luan' },
    ];
    fixture.detectChanges();

    const firstName = fixture.debugElement.query(By.css('#people-list li'));

    app.peopleSelected.subscribe((response) => {
      expect(response).toEqual('Mardoqueu');
    })

    firstName.triggerEventHandler('click', null);

  })

});

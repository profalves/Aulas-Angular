import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent, IUser } from './app.component';


describe('AppComponent', () => {
  let app: AppComponent, fixture: any;

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

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  })

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have the propety title', () => {
    expect(app.title).toEqual('test');
    expect(app.test()).toBeTruthy();
  })

  it('should render title', () => {
    fixture.detectChanges();

    const document = fixture.nativeElement as HTMLElement;

    expect(document.querySelector('h1')?.textContent).toContain(app.title);
  })


});

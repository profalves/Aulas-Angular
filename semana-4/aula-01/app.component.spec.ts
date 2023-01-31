import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import * as axe from 'axe-core'

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

  it('teste de acessibilidade', (done) => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const build = fixture.debugElement.nativeElement;

    axe.run(build, {}, (err, result) => {
      if (err)
        throw err;

      if (result.violations.length > 0)
        console.log(JSON.stringify(result.violations, null, 4))

      expect(result.violations.length).toBe(0);
      done();
    });

  })
});

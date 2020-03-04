import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConventionPage } from './convention.page';

describe('ConventionPage', () => {
  let component: ConventionPage;
  let fixture: ComponentFixture<ConventionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConventionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConventionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

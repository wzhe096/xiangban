import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LangsetPage } from './langset.page';

describe('LangsetPage', () => {
  let component: LangsetPage;
  let fixture: ComponentFixture<LangsetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LangsetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LangsetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

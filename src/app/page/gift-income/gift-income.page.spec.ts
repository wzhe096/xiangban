import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GiftIncomePage } from './gift-income.page';

describe('GiftIncomePage', () => {
  let component: GiftIncomePage;
  let fixture: ComponentFixture<GiftIncomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftIncomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GiftIncomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

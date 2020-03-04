import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SlidPage } from './slid.page';

describe('SlidPage', () => {
  let component: SlidPage;
  let fixture: ComponentFixture<SlidPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SlidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

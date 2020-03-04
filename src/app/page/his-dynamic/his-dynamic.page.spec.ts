import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HisDynamicPage } from './his-dynamic.page';

describe('HisDynamicPage', () => {
  let component: HisDynamicPage;
  let fixture: ComponentFixture<HisDynamicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HisDynamicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HisDynamicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

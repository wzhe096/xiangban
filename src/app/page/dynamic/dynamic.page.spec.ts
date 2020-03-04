import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DynamicPage } from './dynamic.page';

describe('DynamicPage', () => {
  let component: DynamicPage;
  let fixture: ComponentFixture<DynamicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

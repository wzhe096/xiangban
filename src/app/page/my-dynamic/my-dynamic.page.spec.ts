import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyDynamicPage } from './my-dynamic.page';

describe('DynamicPage', () => {
  let component: MyDynamicPage;
  let fixture: ComponentFixture<MyDynamicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDynamicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyDynamicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

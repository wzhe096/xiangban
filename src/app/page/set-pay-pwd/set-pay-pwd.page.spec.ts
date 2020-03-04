import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetPayPwdPage } from './set-pay-pwd.page';

describe('SetPayPwdPage', () => {
  let component: SetPayPwdPage;
  let fixture: ComponentFixture<SetPayPwdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPayPwdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetPayPwdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

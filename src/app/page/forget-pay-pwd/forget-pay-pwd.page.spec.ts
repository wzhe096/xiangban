import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForgetPayPwdPage } from './forget-pay-pwd.page';

describe('ForgetPayPwdPage', () => {
  let component: ForgetPayPwdPage;
  let fixture: ComponentFixture<ForgetPayPwdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPayPwdPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgetPayPwdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

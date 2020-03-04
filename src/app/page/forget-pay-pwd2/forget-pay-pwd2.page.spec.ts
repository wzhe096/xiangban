import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForgetPayPwd2Page } from './forget-pay-pwd2.page';

describe('ForgetPayPwd2Page', () => {
  let component: ForgetPayPwd2Page;
  let fixture: ComponentFixture<ForgetPayPwd2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPayPwd2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgetPayPwd2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

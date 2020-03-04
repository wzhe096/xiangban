import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerificationCodeLoginPage } from './verification-code-login.page';

describe('VerificationCodeLoginPage', () => {
  let component: VerificationCodeLoginPage;
  let fixture: ComponentFixture<VerificationCodeLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationCodeLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationCodeLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CashWithdrawalPage } from './cash-withdrawal.page';

describe('CashWithdrawalPage', () => {
  let component: CashWithdrawalPage;
  let fixture: ComponentFixture<CashWithdrawalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashWithdrawalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CashWithdrawalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

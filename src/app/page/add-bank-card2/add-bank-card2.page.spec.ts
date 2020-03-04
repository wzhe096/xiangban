import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBankCard2Page } from './add-bank-card2.page';

describe('AddBankCard2Page', () => {
  let component: AddBankCard2Page;
  let fixture: ComponentFixture<AddBankCard2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBankCard2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBankCard2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

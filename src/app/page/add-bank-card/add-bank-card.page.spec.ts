import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBankCardPage } from './add-bank-card.page';

describe('AddBankCardPage', () => {
  let component: AddBankCardPage;
  let fixture: ComponentFixture<AddBankCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBankCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBankCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

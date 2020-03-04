import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerservicePage } from './customerservice.page';

describe('CustomerservicePage', () => {
  let component: CustomerservicePage;
  let fixture: ComponentFixture<CustomerservicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerservicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerservicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

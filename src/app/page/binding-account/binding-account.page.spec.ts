import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BindingAccountPage } from './binding-account.page';

describe('BindingAccountPage', () => {
  let component: BindingAccountPage;
  let fixture: ComponentFixture<BindingAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BindingAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BindingAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

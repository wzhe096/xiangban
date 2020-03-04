import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SystemSetupPage } from './system-setup.page';

describe('SystemSetupPage', () => {
  let component: SystemSetupPage;
  let fixture: ComponentFixture<SystemSetupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemSetupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SystemSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

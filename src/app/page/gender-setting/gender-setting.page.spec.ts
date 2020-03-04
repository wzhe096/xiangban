import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenderSettingPage } from './gender-setting.page';

describe('GenderSettingPage', () => {
  let component: GenderSettingPage;
  let fixture: ComponentFixture<GenderSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderSettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenderSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

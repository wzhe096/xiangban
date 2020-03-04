import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenMembershipPage } from './open-membership.page';

describe('OpenMembershipPage', () => {
  let component: OpenMembershipPage;
  let fixture: ComponentFixture<OpenMembershipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenMembershipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenMembershipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

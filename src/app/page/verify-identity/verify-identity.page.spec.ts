import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifyIdentityPage } from './verify-identity.page';

describe('VerifyIdentityPage', () => {
  let component: VerifyIdentityPage;
  let fixture: ComponentFixture<VerifyIdentityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyIdentityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyIdentityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

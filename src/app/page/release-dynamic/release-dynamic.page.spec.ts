import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReleaseDynamicPage } from './release-dynamic.page';

describe('ReleaseDynamicPage', () => {
  let component: ReleaseDynamicPage;
  let fixture: ComponentFixture<ReleaseDynamicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseDynamicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReleaseDynamicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

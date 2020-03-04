import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GiftComponent } from './gift.component';

describe('GiftComponent', () => {
  let component: GiftComponent;
  let fixture: ComponentFixture<GiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfinitePage } from './infinite.page';

describe('InfinitePage', () => {
  let component: InfinitePage;
  let fixture: ComponentFixture<InfinitePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfinitePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfinitePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

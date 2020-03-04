import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TitleMeunComponent } from './title-meun.component';

describe('TitleMeunComponent', () => {
  let component: TitleMeunComponent;
  let fixture: ComponentFixture<TitleMeunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleMeunComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TitleMeunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

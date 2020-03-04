import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformationCompletionPage } from './information-completion.page';

describe('InformationCompletionPage', () => {
  let component: InformationCompletionPage;
  let fixture: ComponentFixture<InformationCompletionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationCompletionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformationCompletionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
